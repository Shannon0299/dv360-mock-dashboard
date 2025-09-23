document.addEventListener('DOMContentLoaded', () => {

    // ===== MOCK DATA =====
    let campaignListData = [
        { name: "Post-Ganesh Chaturthi Sale", budget: 500000, spent: 375000, kpiGoal: 1500, kpiActual: 1250 },
        { name: "Pre-Diwali Brand Awareness", budget: 1000000, spent: 150000, kpiGoal: 50000000, kpiActual: 8200000 },
        { name: "Always-On: Mumbai Metro Targeting", budget: 250000, spent: 245000, kpiGoal: 85, kpiActual: 78 },
        { name: "Q3 Monsoon Deals (Completed)", budget: 400000, spent: 398500, kpiGoal: 20000, kpiActual: 22500 }
    ];
    const audienceListData = [
        { name: "Homepage Visitors (Last 30d)", type: "1st Party", source: "Advertiser", size: { display: 1800000, youtube: 950000, mobile: 1200000 } },
        { name: "High-Intent Car Buyers", type: "Google Audience", source: "Google Ads", size: { display: 25000000, youtube: 15000000, mobile: 18000000 } },
        { name: "YouTube Subscribers", type: "YouTube users", source: "YouTube", size: { display: 0, youtube: 250000, mobile: 180000 } }
    ];
    const creativeListData = [
        { id: 1, name: "Q4 Holiday Sale - 300x250", type: "Display", dimensions: "300 x 250", status: "Approved", imageUrl: "https://placehold.co/300x250/E8F0FE/1A73E8?text=Holiday+Sale!" },
        { id: 2, name: "Summer Branding Video", type: "Video", dimensions: "1920 x 1080", status: "Approved", imageUrl: "https://placehold.co/640x360/E8F0FE/1A73E8?text=Summer+Video" },
        { id: 3, name: "New Product Launch - HTML5", type: "Rich Media", dimensions: "300 x 600", status: "In Review", imageUrl: "https://placehold.co/300x600/FEF7E0/B36300?text=New+Product" }
    ];
    const reportData = {
        campaign: { labels: ["Post-Ganesh Chaturthi Sale", "Pre-Diwali Brand Awareness", "Always-On Targeting", "Q3 Monsoon Deals"], data: [12500000, 8200000, 18000000, 9500000] },
        date: { labels: ["2025-09-16", "2025-09-17", "2025-09-18", "2025-09-19", "2025-09-20", "2025-09-21", "2025-09-22"], data: [120000, 180000, 150000, 210000, 250000, 220000, 280000] },
    };

    // ===== DOM ELEMENT SELECTION =====
    const allViews = document.querySelectorAll('main > section');
    const sidebarNav = document.querySelector('.sidebar-nav');
    const navLinks = document.querySelectorAll('.sidebar-nav li');
    const campaignListContainer = document.getElementById('campaign-list');
    const audienceListContainer = document.getElementById('audience-list-container');
    const audienceTabs = document.querySelectorAll('#audiences-view .sub-navigation li');
    const audienceTabContents = document.querySelectorAll('#audiences-view .tab-content');
    const creativeListContainer = document.getElementById('creative-list-container');
    const creativeTabs = document.querySelectorAll('#creatives-view .sub-navigation li');
    const creativeTabContents = document.querySelectorAll('#creatives-view .tab-content');

    // Modal and Form elements
    const createCampaignBtn = document.getElementById('create-campaign-btn');
    const modalOverlay = document.getElementById('campaign-modal-overlay');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const campaignForm = document.getElementById('create-campaign-form');
    const formSteps = document.querySelectorAll('.form-step');
    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');
    const submitBtn = document.getElementById('submit-btn');
    let currentStep = 0;

    // Ad Canvas Modal elements
    const adCanvasModal = document.getElementById('ad-canvas-modal-overlay');
    const closeAdCanvasBtn = document.getElementById('close-ad-canvas-btn');
    const adCanvasImage = document.getElementById('ad-canvas-image');
    const adCanvasTitle = document.getElementById('ad-canvas-title');
    const adCanvasPreviewArea = document.querySelector('.ad-canvas-preview-area');
    const deviceSwitcher = document.querySelector('.device-switcher');

    // Report elements
    const runReportBtn = document.getElementById('run-report-btn');
    const vizTypeSelect = document.getElementById('visualization-type');
    const reportVisuals = document.querySelectorAll('.report-visual');
    const reportTableContainer = document.getElementById('report-table-container');
    const barChartCanvasEl = document.getElementById('bar-chart-canvas');
    const lineChartCanvasEl = document.getElementById('line-chart-canvas');
    const pieChartCanvasEl = document.getElementById('pie-chart-canvas');
    let activeBarChart, activeLineChart, activePieChart;

    // ===== HELPER FUNCTIONS =====
    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    const formatNumber = (num) => (num >= 1000000) ? `${(num / 1000000).toFixed(1)}M` : (num >= 1000) ? `${(num / 1000).toFixed(0)}K` : new Intl.NumberFormat('en-US').format(num);

    // ===== RENDER FUNCTIONS =====
    const renderCampaignList = (campaigns) => {
        if (!campaignListContainer) return; // Safeguard
        let tableHTML = `<div id="campaign-table-container"><table><thead><tr><th>Campaign Name</th><th>Budget</th><th>Spent</th><th>KPI Goal</th><th>KPI Actual</th></tr></thead><tbody>`;
        campaigns.forEach(c => { tableHTML += `<tr><td>${c.name}</td><td>${formatCurrency(c.budget)}</td><td>${formatCurrency(c.spent)}</td><td>${formatNumber(c.kpiGoal)}</td><td>${formatNumber(c.kpiActual)}</td></tr>`; });
        tableHTML += `</tbody></table></div>`;
        campaignListContainer.innerHTML = tableHTML;
    };
    const renderAudienceTable = (audiences) => {
        if (!audienceListContainer) return; // Safeguard
        let tableHTML = `<div id="campaign-table-container"><table><thead><tr><th>Audience Name</th><th>Type</th><th>Source</th><th>Size (Users)</th></tr></thead><tbody>`;
        audiences.forEach(a => { tableHTML += `<tr><td>${a.name}</td><td>${a.type}</td><td>${a.source}</td><td><ul class="audience-size-list"><li><span class="media-type">Display:</span> <strong>${formatNumber(a.size.display)}</strong></li><li><span class="media-type">YouTube:</span> <strong>${formatNumber(a.size.youtube)}</strong></li><li><span class="media-type">Mobile:</span> <strong>${formatNumber(a.size.mobile)}</strong></li></ul></td></tr>`; });
        tableHTML += `</tbody></table></div>`;
        audienceListContainer.innerHTML = tableHTML;
    };
    const renderCreativeTable = (creatives) => {
        if (!creativeListContainer) return; // Safeguard
        let tableHTML = `<div id="campaign-table-container"><table><thead><tr><th>Preview</th><th>Name</th><th>Type</th><th>Dimensions</th><th>Status</th><th>Actions</th></tr></thead><tbody>`;
        creatives.forEach(c => { tableHTML += `<tr><td><img src="${c.imageUrl}" alt="preview" style="height: 30px; vertical-align: middle;"></td><td>${c.name}</td><td>${c.type}</td><td>${c.dimensions}</td><td><span class="status status-${c.status.toLowerCase().replace(' ', '-')}">${c.status}</span></td><td><button class="preview-btn" data-creative-id="${c.id}">Preview</button></td></tr>`; });
        tableHTML += `</tbody></table></div>`;
        creativeListContainer.innerHTML = tableHTML;
    };

    const renderReportTable = (data) => {
        if (!reportTableContainer) return;
        let tableHTML = `<div id="campaign-table-container"><table><thead><tr><th>Campaign</th><th>Impressions</th></tr></thead><tbody>`;
        data.labels.forEach((label, index) => { tableHTML += `<tr><td>${label}</td><td>${formatNumber(data.data[index])}</td></tr>`; });
        tableHTML += `</tbody></table></div>`;
        reportTableContainer.innerHTML = tableHTML;
    };
    const renderBarChart = (data) => {
        if (!barChartCanvasEl) return;
        if (activeBarChart) activeBarChart.destroy();
        activeBarChart = new Chart(barChartCanvasEl.getContext('2d'), { type: 'bar', data: { labels: data.labels, datasets: [{ label: 'Impressions', data: data.data, backgroundColor: '#1a73e8' }] }, options: { responsive: true, maintainAspectRatio: false } });
    };
    const renderLineChart = (data) => {
        if (!lineChartCanvasEl) return;
        if (activeLineChart) activeLineChart.destroy();
        activeLineChart = new Chart(lineChartCanvasEl.getContext('2d'), { type: 'line', data: { labels: data.labels, datasets: [{ label: 'Impressions by Date', data: data.data, borderColor: '#1a73e8', fill: false }] }, options: { responsive: true, maintainAspectRatio: false } });
    };
    const renderPieChart = (data) => {
        if (!pieChartCanvasEl) return;
        if (activePieChart) activePieChart.destroy();
        activePieChart = new Chart(pieChartCanvasEl.getContext('2d'), { type: 'pie', data: { labels: data.labels, datasets: [{ label: 'Impressions', data: data.data, backgroundColor: ['#1a73e8', '#fbbc05', '#34a853', '#ea4335', '#4285f4'] }] }, options: { responsive: true, maintainAspectRatio: false } });
    };

    // ===== VIEW SWITCHING & EVENT LISTENERS =====
    const showView = (viewId) => { allViews.forEach(v => v.classList.add('hidden')); const vts = document.getElementById(viewId); if (vts) vts.classList.remove('hidden'); };
    
    // Sidebar navigation
    if (sidebarNav) {
        sidebarNav.addEventListener('click', (event) => {
            event.preventDefault(); const link = event.target.closest('a'); if (!link) return;
            navLinks.forEach(l => l.classList.remove('active')); link.parentElement.classList.add('active');
            const text = link.textContent.toLowerCase();
            let viewId = 'campaign-view';
            if (text.includes('audiences')) viewId = 'audiences-view';
            else if (text.includes('creatives')) viewId = 'creatives-view';
            else if (text.includes('reporting')) viewId = 'reporting-view';
            showView(viewId);
        });
    }

    // NEW: Null checks to prevent crashes if HTML elements are missing
    if (createCampaignBtn && modalOverlay && closeModalBtn && campaignForm) {
        const showStep = (stepIndex) => { formSteps.forEach((s, i) => s.classList.toggle('active-step', i === stepIndex)); backBtn.classList.toggle('hidden', stepIndex === 0); nextBtn.classList.toggle('hidden', stepIndex === formSteps.length - 1); submitBtn.classList.toggle('hidden', stepIndex !== formSteps.length - 1); };
        const openModal = () => { currentStep = 0; showStep(currentStep); campaignForm.reset(); modalOverlay.classList.remove('hidden'); };
        const closeModal = () => modalOverlay.classList.add('hidden');
        
        createCampaignBtn.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
        nextBtn.addEventListener('click', () => { if (currentStep < formSteps.length - 1) { currentStep++; showStep(currentStep); } });
        backBtn.addEventListener('click', () => { if (currentStep > 0) { currentStep--; showStep(currentStep); } });
        campaignForm.addEventListener('submit', (e) => { e.preventDefault(); const nc = { name: document.getElementById('campaign-name').value, budget: parseFloat(document.getElementById('planned-spend').value) || 0, spent: 0, kpiGoal: parseFloat(document.getElementById('campaign-kpi-amount').value) || 1, kpiActual: 0 }; campaignListData.push(nc); renderCampaignList(campaignListData); closeModal(); });
    }
    
    audienceTabs.forEach(tab => tab.addEventListener('click', () => { const id = tab.dataset.tab; audienceTabs.forEach(t => t.classList.remove('active-tab')); tab.classList.add('active-tab'); audienceTabContents.forEach(c => c.classList.toggle('active-tab-content', c.id === `${id}-content`)); }));
    creativeTabs.forEach(tab => tab.addEventListener('click', () => { const id = tab.dataset.tab; creativeTabs.forEach(t => t.classList.remove('active-tab')); tab.classList.add('active-tab'); creativeTabContents.forEach(c => c.classList.toggle('active-tab-content', c.id === `${id}-content`)); }));

    if (adCanvasModal) {
        const openAdCanvas = (creativeId) => {
            const creative = creativeListData.find(c => c.id === creativeId);
            if (!creative) return;
            adCanvasTitle.textContent = `Ad Canvas Preview: ${creative.name}`;
            adCanvasImage.src = creative.imageUrl;
            const defaultDevice = deviceSwitcher.querySelector('[data-size="300x250"]');
            if (defaultDevice) defaultDevice.click();
            adCanvasModal.classList.remove('hidden');
        };
        creativeListContainer.addEventListener('click', (e) => { if (e.target.classList.contains('preview-btn')) { const id = parseInt(e.target.dataset.creativeId, 10); openAdCanvas(id); } });
        closeAdCanvasBtn.addEventListener('click', () => adCanvasModal.classList.add('hidden'));
        deviceSwitcher.addEventListener('click', (e) => { if (e.target.classList.contains('device-btn')) { const [width, height] = e.target.dataset.size.split('x'); adCanvasPreviewArea.style.aspectRatio = `${width} / ${height}`; deviceSwitcher.querySelectorAll('.device-btn').forEach(btn => btn.classList.remove('active-device')); e.target.classList.add('active-device'); } });
    }
    
    if (runReportBtn) {
        runReportBtn.addEventListener('click', () => {
            const vizType = vizTypeSelect.value;
            const currentData = reportData.campaign;
            const timeData = reportData.date;
            reportVisuals.forEach(v => v.classList.remove('active-visual'));
            switch (vizType) {
                case 'bar': renderBarChart(currentData); if (barChartCanvasEl) barChartCanvasEl.parentElement.classList.add('active-visual'); break;
                case 'line': renderLineChart(timeData); if (lineChartCanvasEl) lineChartCanvasEl.parentElement.classList.add('active-visual'); break;
                case 'pie': renderPieChart(currentData); if (pieChartCanvasEl) pieChartCanvasEl.parentElement.classList.add('active-visual'); break;
                default: renderReportTable(currentData); if (reportTableContainer) reportTableContainer.classList.add('active-visual'); break;
            }
        });
    }

    // ===== INITIALIZATION =====
    showView('campaign-view');
    renderCampaignList(campaignListData);
    renderAudienceTable(audienceListData);
    renderCreativeTable(creativeListData); 
    renderReportTable(reportData.campaign);
});
