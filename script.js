document.addEventListener('DOMContentLoaded', () => {

    // ===== MOCK DATA =====
    let campaignListData = [
        { name: "Post-Ganesh Chaturthi Sale", budget: 500000, spent: 375000, kpiGoal: 1500, kpiActual: 1250 },
        { name: "Pre-Diwali Brand Awareness", budget: 1000000, spent: 150000, kpiGoal: 50000000, kpiActual: 8200000 },
        { name: "Always-On: Mumbai Metro Targeting", budget: 250000, spent: 245000, kpiGoal: 85, kpiActual: 78 }
    ];
    let insertionOrderData = [
        { name: "IO-01: Diwali Promo", campaign: "Pre-Diwali Brand Awareness", status: "Active", budget: 500000, spent: 120000 },
        { name: "IO-01: Post-Ganesh Prospecting", campaign: "Post-Ganesh Chaturthi Sale", status: "Active", budget: 250000, spent: 200000 },
        { name: "IO-02: Remarketing", campaign: "Post-Ganesh Chaturthi Sale", status: "Paused", budget: 250000, spent: 175000 },
    ];
    let lineItemData = [
        { name: "LI-01: Display Ads - Prospecting", insertionOrder: "IO-01: Post-Ganesh Prospecting", type: "Display", status: "Pacing Well"},
        { name: "LI-02: Video Preroll - Diwali", insertionOrder: "IO-01: Diwali Promo", type: "Video", status: "Underspending"},
        { name: "LI-03: Display Ads - Remarketing", insertionOrder: "IO-02: Remarketing", type: "Display", status: "Paused"}
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
        campaign: { labels: ["Post-Ganesh Chaturthi Sale", "Pre-Diwali Brand Awareness", "Always-On Targeting"], data: [12500000, 8200000, 18000000] },
        date: { labels: ["2025-09-18", "2025-09-19", "2025-09-20", "2025-09-21", "2025-09-22", "2025-09-23", "2025-09-24"], data: [150000, 210000, 250000, 220000, 280000, 310000, 290000] },
    };

    // ===== DOM ELEMENT SELECTION =====
    const allViews = document.querySelectorAll('main > section');
    const sidebarNav = document.querySelector('.sidebar-nav');
    const navLinks = document.querySelectorAll('.sidebar-nav li');
    
    const campaignListContainer = document.getElementById('campaign-list');
    const campaignTabs = document.querySelectorAll('#campaign-view .sub-navigation li');
    const campaignTabContents = document.querySelectorAll('#campaign-view .tab-content');
    
    const ioListContainer = document.getElementById('insertion-order-list-container');
    const liListContainer = document.getElementById('line-item-list-container');
    
    const audienceListContainer = document.getElementById('audience-list-container');
    const audienceTabs = document.querySelectorAll('#audiences-view .sub-navigation li');
    const audienceTabContents = document.querySelectorAll('#audiences-view .tab-content');
    
    const creativeListContainer = document.getElementById('creative-list-container');
    const creativeTabs = document.querySelectorAll('#creatives-view .sub-navigation li');
    const creativeTabContents = document.querySelectorAll('#creatives-view .tab-content');

    // Modals
    const createCampaignBtn = document.getElementById('create-campaign-btn');
    const modalOverlay = document.getElementById('campaign-modal-overlay');
    const newIoBtn = document.getElementById('new-insertion-order-btn');
    const ioModal = document.getElementById('io-modal-overlay');
    const newLineItemBtn = document.getElementById('new-line-item-btn');
    const liModal = document.getElementById('li-modal-overlay');
    const adCanvasModal = document.getElementById('ad-canvas-modal-overlay');
    
    // Reporting
    const runReportBtn = document.getElementById('run-report-btn');
    const vizTypeSelect = document.getElementById('visualization-type');
    const reportVisuals = document.querySelectorAll('.report-visual');
    const reportTableContainer = document.getElementById('report-table-container');
    let activeBarChart, activeLineChart, activePieChart;

    // ===== HELPER FUNCTIONS =====
    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    const formatNumber = (num) => (num >= 1000000) ? `${(num / 1000000).toFixed(1)}M` : (num >= 1000) ? `${(num / 1000).toFixed(0)}K` : new Intl.NumberFormat('en-US').format(num);

    // ===== RENDER FUNCTIONS =====
    const renderCampaignList = (campaigns) => {
        if (!campaignListContainer) return;
        let tableHTML = `<div id="campaign-table-container"><table><thead><tr><th>Campaign Name</th><th>Budget</th><th>Spent</th><th>KPI Goal</th><th>KPI Actual</th></tr></thead><tbody>`;
        campaigns.forEach(c => { tableHTML += `<tr><td>${c.name}</td><td>${formatCurrency(c.budget)}</td><td>${formatCurrency(c.spent)}</td><td>${formatNumber(c.kpiGoal)}</td><td>${formatNumber(c.kpiActual)}</td></tr>`; });
        tableHTML += `</tbody></table></div>`;
        campaignListContainer.innerHTML = tableHTML;
    };
    const renderInsertionOrderTable = (ios) => {
        if (!ioListContainer) return;
        let tableHTML = `<div id="campaign-table-container"><table><thead><tr><th>IO Name</th><th>Campaign</th><th>Status</th><th>Spend / Budget</th></tr></thead><tbody>`;
        ios.forEach(io => { tableHTML += `<tr><td>${io.name}</td><td>${io.campaign}</td><td><span class="status status-${io.status.toLowerCase()}">${io.status}</span></td><td>${formatCurrency(io.spent)} / ${formatCurrency(io.budget)}</td></tr>`; });
        tableHTML += `</tbody></table></div>`;
        ioListContainer.innerHTML = tableHTML;
    };
    const renderLineItemTable = (lis) => {
        if (!liListContainer) return;
        let tableHTML = `<div id="campaign-table-container"><table><thead><tr><th>Line Item Name</th><th>Insertion Order</th><th>Type</th><th>Status</th></tr></thead><tbody>`;
        lis.forEach(li => { tableHTML += `<tr><td>${li.name}</td><td>${li.insertionOrder}</td><td>${li.type}</td><td><span class="status status-${li.status.toLowerCase().replace(' ', '-')}">${li.status}</span></td></tr>`; });
        tableHTML += `</tbody></table></div>`;
        liListContainer.innerHTML = tableHTML;
    };
    const renderAudienceTable = (audiences) => { 
        if (!audienceListContainer) return;
        let tableHTML = `<div id="campaign-table-container"><table><thead><tr><th>Audience Name</th><th>Type</th><th>Source</th><th>Size (Users)</th></tr></thead><tbody>`;
        audiences.forEach(a => { tableHTML += `<tr><td>${a.name}</td><td>${a.type}</td><td>${a.source}</td><td><ul class="audience-size-list"><li><span class="media-type">Display:</span> <strong>${formatNumber(a.size.display)}</strong></li><li><span class="media-type">YouTube:</span> <strong>${formatNumber(a.size.youtube)}</strong></li><li><span class="media-type">Mobile:</span> <strong>${formatNumber(a.size.mobile)}</strong></li></ul></td></tr>`; });
        tableHTML += `</tbody></table></div>`;
        audienceListContainer.innerHTML = tableHTML;
    };
    const renderCreativeTable = (creatives) => {
        if (!creativeListContainer) return;
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
        const canvasEl = document.getElementById('bar-chart-canvas');
        if (!canvasEl) return;
        if (activeBarChart) activeBarChart.destroy();
        activeBarChart = new Chart(canvasEl.getContext('2d'), { type: 'bar', data: { labels: data.labels, datasets: [{ label: 'Impressions', data: data.data, backgroundColor: '#1a73e8' }] }, options: { responsive: true, maintainAspectRatio: false } });
    };
    const renderLineChart = (data) => {
        const canvasEl = document.getElementById('line-chart-canvas');
        if (!canvasEl) return;
        if (activeLineChart) activeLineChart.destroy();
        activeLineChart = new Chart(canvasEl.getContext('2d'), { type: 'line', data: { labels: data.labels, datasets: [{ label: 'Impressions by Date', data: data.data, borderColor: '#1a73e8', fill: false }] }, options: { responsive: true, maintainAspectRatio: false } });
    };
    const renderPieChart = (data) => {
        const canvasEl = document.getElementById('pie-chart-canvas');
        if (!canvasEl) return;
        if (activePieChart) activePieChart.destroy();
        activePieChart = new Chart(canvasEl.getContext('2d'), { type: 'pie', data: { labels: data.labels, datasets: [{ label: 'Impressions', data: data.data, backgroundColor: ['#1a73e8', '#fbbc05', '#34a853', '#ea4335', '#4285f4'] }] }, options: { responsive: true, maintainAspectRatio: false } });
    };

    // ===== EVENT LISTENERS =====
    const showView = (viewId) => { allViews.forEach(v => v.classList.add('hidden')); const vts = document.getElementById(viewId); if (vts) vts.classList.remove('hidden'); };
    
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

    const setupModal = (btn, modal, onsubmit) => {
        if (!btn || !modal) return;
        const form = modal.querySelector('form');
        const steps = modal.querySelectorAll('.form-step');
        const nextBtn = modal.querySelector('.create-btn:not([type=submit])');
        const backBtn = modal.querySelector('.secondary-btn');
        const submitBtn = modal.querySelector('button[type=submit]');
        let currentStep = 0;

        const showStep = (stepIndex) => {
            steps.forEach((step, index) => step.classList.toggle('active-step', index === stepIndex));
            if (backBtn) backBtn.classList.toggle('hidden', stepIndex === 0);
            if (nextBtn) nextBtn.classList.toggle('hidden', stepIndex === steps.length - 1);
            if (submitBtn) submitBtn.classList.toggle('hidden', stepIndex !== steps.length - 1);
        };
        const openModal = () => { currentStep = 0; showStep(currentStep); if (form) form.reset(); modal.classList.remove('hidden'); };
        const closeModal = () => modal.classList.add('hidden');
        
        btn.addEventListener('click', openModal);
        modal.querySelector('.close-btn').addEventListener('click', closeModal);
        if (nextBtn) nextBtn.addEventListener('click', () => { if (currentStep < steps.length - 1) { currentStep++; showStep(currentStep); } });
        if (backBtn) backBtn.addEventListener('click', () => { if (currentStep > 0) { currentStep--; showStep(currentStep); } });
        if (form) form.addEventListener('submit', (e) => { e.preventDefault(); onsubmit(closeModal); });
    };
    
    setupModal(createCampaignBtn, modalOverlay, (closeModal) => {
        const newCampaign = { name: document.getElementById('campaign-name').value, budget: parseFloat(document.getElementById('planned-spend').value) || 0, spent: 0, kpiGoal: 1, kpiActual: 0 };
        campaignListData.push(newCampaign);
        renderCampaignList(campaignListData);
        closeModal();
    });
    setupModal(newIoBtn, ioModal, (closeModal) => { alert("New Insertion Order Created!"); closeModal(); });
    setupModal(newLineItemBtn, liModal, (closeModal) => {
        const newLi = { name: document.getElementById('li-name').value, insertionOrder: "IO-01: Diwali Promo", type: document.getElementById('li-type').value, status: "In Review" };
        lineItemData.push(newLi);
        renderLineItemTable(lineItemData);
        closeModal();
    });
    
    const setupTabSwitching = (tabs, contents) => {
        tabs.forEach(tab => tab.addEventListener('click', () => {
            const id = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active-tab'));
            tab.classList.add('active-tab');
            contents.forEach(c => c.classList.toggle('active-tab-content', c.id === `${id}-content`));
        }));
    };
    setupTabSwitching(campaignTabs, campaignTabContents);
    setupTabSwitching(audienceTabs, audienceTabContents);
    setupTabSwitching(creativeTabs, creativeTabContents);

    if (adCanvasModal) {
        const adCanvasTitle = adCanvasModal.querySelector('#ad-canvas-title');
        const adCanvasImage = adCanvasModal.querySelector('#ad-canvas-image');
        const adCanvasPreviewArea = adCanvasModal.querySelector('.ad-canvas-preview-area');
        const deviceSwitcher = adCanvasModal.querySelector('.device-switcher');
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
        adCanvasModal.querySelector('.close-btn').addEventListener('click', () => adCanvasModal.classList.add('hidden'));
        deviceSwitcher.addEventListener('click', (e) => { if (e.target.classList.contains('device-btn')) { const [width, height] = e.target.dataset.size.split('x'); adCanvasPreviewArea.style.aspectRatio = `${width} / ${height}`; deviceSwitcher.querySelectorAll('.device-btn').forEach(btn => btn.classList.remove('active-device')); e.target.classList.add('active-device'); } });
    }
    
    if (runReportBtn) {
        runReportBtn.addEventListener('click', () => {
            const vizType = vizTypeSelect.value;
            const currentData = reportData.campaign;
            const timeData = reportData.date;
            reportVisuals.forEach(v => v.classList.remove('active-visual'));
            const barChartContainer = document.getElementById('bar-chart-canvas')?.parentElement;
            const lineChartContainer = document.getElementById('line-chart-canvas')?.parentElement;
            const pieChartContainer = document.getElementById('pie-chart-canvas')?.parentElement;
            switch (vizType) {
                case 'bar': renderBarChart(currentData); if (barChartContainer) barChartContainer.classList.add('active-visual'); break;
                case 'line': renderLineChart(timeData); if (lineChartContainer) lineChartContainer.classList.add('active-visual'); break;
                case 'pie': renderPieChart(currentData); if (pieChartContainer) pieChartContainer.classList.add('active-visual'); break;
                default: renderReportTable(currentData); if (reportTableContainer) reportTableContainer.classList.add('active-visual'); break;
            }
        });
    }

    // ===== INITIALIZATION =====
    showView('campaign-view');
    renderCampaignList(campaignListData);
    renderInsertionOrderTable(insertionOrderData);
    renderLineItemTable(lineItemData);
    renderAudienceTable(audienceListData);
    renderCreativeTable(creativeListData); 
    renderReportTable(reportData.campaign);
});
