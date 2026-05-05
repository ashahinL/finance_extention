const STORAGE_KEY = 'marketData';
const ALARM_NAME = 'refreshMarketData';
const REFRESH_INTERVAL_MINUTES = 10;

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create(ALARM_NAME, {
    delayInMinutes: 0.2,
    periodInMinutes: REFRESH_INTERVAL_MINUTES
  });

  safeFetchAndCache();
});

chrome.runtime.onStartup.addListener(() => {
  safeFetchAndCache();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME) {
    safeFetchAndCache();
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request?.action === 'refreshData') {
    fetchAndCache()
      .then((data) => sendResponse({ success: true, data }))
      .catch((error) => sendResponse({ success: false, error: error.message }));

    return true;
  }

  if (request?.action === 'getCachedData') {
    chrome.storage.local
      .get([STORAGE_KEY])
      .then((result) => sendResponse({ success: true, data: result[STORAGE_KEY] || null }))
      .catch((error) => sendResponse({ success: false, error: error.message }));

    return true;
  }

  return false;
});

async function safeFetchAndCache() {
  try {
    await fetchAndCache();
  } catch (error) {
    console.error('Automatic refresh failed:', error);
    setErrorBadge();
  }
}

async function fetchAndCache() {
  const data = await fetchMarketData();

  await chrome.storage.local.set({ [STORAGE_KEY]: data });
  setRateBadge(data.usdEgp.value);

  return data;
}

async function fetchMarketData() {
  const [usdEgp, goldOunceUsd] = await Promise.all([
    fetchUsdEgpRate(),
    fetchGoldOunceUsdPrice()
  ]);

  return {
    usdEgp,
    goldOunceUsd,
    fetchedAt: Date.now()
  };
}

async function fetchUsdEgpRate() {
  try {
    const data = await fetchJson('https://open.er-api.com/v6/latest/USD');
    const rate = Number(data?.rates?.EGP);

    if (data?.result !== 'success' || !Number.isFinite(rate)) {
      throw new Error('Invalid USD/EGP payload from open.er-api.com');
    }

    return {
      value: rate,
      source: 'open.er-api.com',
      providerUpdatedAt: Number(data.time_last_update_unix) * 1000,
      fetchedAt: Date.now()
    };
  } catch (primaryError) {
    const fallback = await fetchStooqRate('USDEGP');

    return {
      value: fallback.value,
      source: 'stooq.com',
      providerUpdatedAt: fallback.providerUpdatedAt,
      fetchedAt: Date.now(),
      fallbackReason: primaryError.message
    };
  }
}

async function fetchGoldOunceUsdPrice() {
  try {
    const data = await fetchJson('https://api.gold-api.com/price/XAU');
    const price = Number(data?.price);

    if (!Number.isFinite(price)) {
      throw new Error('Invalid XAU/USD payload from api.gold-api.com');
    }

    const providerUpdatedAt = Date.parse(data.updatedAt || '');

    return {
      value: price,
      source: 'api.gold-api.com',
      providerUpdatedAt: Number.isFinite(providerUpdatedAt) ? providerUpdatedAt : null,
      fetchedAt: Date.now()
    };
  } catch (primaryError) {
    const fallback = await fetchStooqRate('XAUUSD');

    return {
      value: fallback.value,
      source: 'stooq.com',
      providerUpdatedAt: fallback.providerUpdatedAt,
      fetchedAt: Date.now(),
      fallbackReason: primaryError.message
    };
  }
}

async function fetchStooqRate(symbol) {
  const csv = await fetchText(`https://stooq.com/q/l/?s=${symbol.toLowerCase()}&f=sd2t2ohlcv&h&e=csv`);
  const lines = csv.trim().split(/\r?\n/);

  if (lines.length < 2) {
    throw new Error(`Unexpected CSV format for ${symbol}`);
  }

  const headers = lines[0].split(',').map((header) => header.trim().toLowerCase());
  const values = lines[1].split(',').map((value) => value.trim());
  const closeIndex = headers.indexOf('close');
  const closeValue = Number(values[closeIndex]);

  if (!Number.isFinite(closeValue)) {
    throw new Error(`Invalid close price for ${symbol}`);
  }

  const date = values[1];
  const time = values[2];
  const providerUpdatedAt = Date.parse(`${date}T${time}Z`);

  return {
    value: closeValue,
    providerUpdatedAt: Number.isFinite(providerUpdatedAt) ? providerUpdatedAt : null
  };
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }

  return response.json();
}

async function fetchText(url) {
  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }

  return response.text();
}

function setRateBadge(usdEgpRate) {
  const badgeText = Number.isFinite(usdEgpRate) ? usdEgpRate.toFixed(1).slice(0, 4) : '!';

  chrome.action.setBadgeText({ text: badgeText });
  chrome.action.setBadgeBackgroundColor({ color: '#2e7d32' });
}

function setErrorBadge() {
  chrome.action.setBadgeText({ text: '!' });
  chrome.action.setBadgeBackgroundColor({ color: '#c62828' });
}

chrome.action.setBadgeText({ text: '...' });
chrome.action.setBadgeBackgroundColor({ color: '#1565c0' });