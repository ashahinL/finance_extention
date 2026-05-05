document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    loading: document.getElementById('loading'),
    error: document.getElementById('error'),
    errorText: document.getElementById('errorText'),
    ratesContainer: document.getElementById('ratesContainer'),
    usdEgpRate: document.getElementById('usdEgpRate'),
    goldOunceUsdRate: document.getElementById('goldOunceUsdRate'),
    usdEgpSource: document.getElementById('usdEgpSource'),
    goldSource: document.getElementById('goldSource'),
    lastUpdated: document.getElementById('lastUpdated'),
    refreshBtn: document.getElementById('refreshBtn'),
    statusDot: document.getElementById('statusDot'),
    statusText: document.getElementById('statusText')
  };

  elements.refreshBtn.addEventListener('click', () => refreshData({ showLoadingState: true }));

  init();

  async function init() {
    showLoading();
    updateStatus('connecting', 'Loading cached data...');

    try {
      const cachedResponse = await chrome.runtime.sendMessage({ action: 'getCachedData' });

      if (cachedResponse?.success && cachedResponse.data) {
        displayData(cachedResponse.data);
        updateStatus('online', 'Showing latest snapshot');
      }
    } catch (error) {
      console.warn('Could not read cached data:', error);
    }

    refreshData({ showLoadingState: !elements.ratesContainer || elements.ratesContainer.style.display === 'none' });
  }

  async function refreshData({ showLoadingState }) {
    if (showLoadingState) {
      showLoading();
    }

    setRefreshButtonState(true);
    updateStatus('connecting', 'Refreshing...');

    try {
      const response = await chrome.runtime.sendMessage({ action: 'refreshData' });

      if (!response?.success || !response.data) {
        throw new Error(response?.error || 'No data returned from background worker');
      }

      displayData(response.data);
      updateStatus('online', 'Updated');
    } catch (error) {
      console.error('Refresh failed:', error);
      showError(error.message || 'Unable to fetch market data');
      updateStatus('offline', 'Update failed');
    } finally {
      setRefreshButtonState(false);
    }
  }

  function displayData(data) {
    const usdEgp = Number(data?.usdEgp?.value);
    const gold = Number(data?.goldOunceUsd?.value);

    elements.usdEgpRate.textContent = Number.isFinite(usdEgp) ? `${usdEgp.toFixed(3)} EGP` : '--';
    elements.goldOunceUsdRate.textContent = Number.isFinite(gold) ? `${gold.toFixed(2)} USD` : '--';

    elements.usdEgpSource.textContent = `Source: ${data?.usdEgp?.source || 'Unknown'}`;
    elements.goldSource.textContent = `Source: ${data?.goldOunceUsd?.source || 'Unknown'}`;

    const updatedAt = Number(data?.fetchedAt);
    elements.lastUpdated.textContent = Number.isFinite(updatedAt)
      ? `Updated: ${new Date(updatedAt).toLocaleString()}`
      : 'Updated: Unknown';

    showRates();
  }

  function showLoading() {
    elements.loading.style.display = 'block';
    elements.error.style.display = 'none';
    elements.ratesContainer.style.display = 'none';
  }

  function showError(message) {
    elements.errorText.textContent = message;
    elements.loading.style.display = 'none';
    elements.error.style.display = 'block';
    elements.ratesContainer.style.display = 'none';
  }

  function showRates() {
    elements.loading.style.display = 'none';
    elements.error.style.display = 'none';
    elements.ratesContainer.style.display = 'block';
  }

  function updateStatus(status, text) {
    elements.statusText.textContent = text;

    if (status === 'offline') {
      elements.statusDot.className = 'status-dot offline';
      return;
    }

    if (status === 'connecting') {
      elements.statusDot.className = 'status-dot connecting';
      return;
    }

    elements.statusDot.className = 'status-dot';
  }

  function setRefreshButtonState(isLoading) {
    elements.refreshBtn.disabled = isLoading;
    elements.refreshBtn.textContent = isLoading ? 'Refreshing...' : 'Refresh';
  }
});