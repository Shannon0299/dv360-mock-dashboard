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
        { name: "High-Intent Car Buyers", type: "Google Audience", source: "Google Ads", size: { display: 25000000, youtube: 15000000, mobile: 18000000 } }
    ];
    const creativeListData = [
        { id: 1, name: "Q4 Holiday Sale - 300x250", type: "Display", dimensions: "300 x 250", status: "Approved", imageUrl: "https://placehold.co/300x250/E8F0FE/1A73E8?text=Holiday+Sale!" },
        { id: 2, name: "Summer Branding Video", type: "Video", dimensions: "1920 x 1080", status: "Approved", imageUrl: "https://placehold.co/640x360/E8F0FE/1A73E8?text=Summer+Video" },
        { id: 3, name: "New Product Launch - HTML5", type: "Rich Media", dimensions: "300 x 600", status: "In Review", imageUrl: "https://placehold.co/300x600/FEF7E0/B36300?text=New+Product" }
    ];
     const teamMemberData = [
        { name: "Janelle", role: "Brand Manager", initials: "J" },
        { name: "Aria", role: "Creative Designer", initials: "A" },
        { name: "Roberto", role: "Media Planner", initials: "R" },
    ];
    const formatGalleryData = [
        { name: "Parallax", description: "An immersive, high-impact display format that responds to scroll.", creativeId: 3 },
        { name: "Standard Display", description: "Classic banner ads in all IAB sizes.", creativeId: 1 },
        { name: "Video Preroll", description: "Video ads that play before YouTube content.", creativeId: 2 },
    ];
    const reportData = {
        campaign: { labels: ["Post-Ganesh Chaturthi Sale", "Pre-Diwali Brand Awareness", "Always-On Targeting"], data: [12500000, 8200000, 18000000] },
        date: { labels: ["2025-09-20", "2025-09-21", "2025-09-22", "2025-09-23", "2025-09-24", "2025-09-25", "2025-09-26"], data: [250000, 220000, 280000, 310000, 290000, 350000, 330000] },
    };
    const intelligenceAlertsData = [
        { title: "Underpacing Insertion Order", severity: "warning", description: "IO-02: Remarketing is projected to underspend its budget by 45%.", actions: ["Troubleshoot", "Details"] },
        { title: "Creative Approval Needed", severity: "warning", description: "1 creative in 'Pre-Diwali Brand Awareness' is still in review.", actions: ["Details"] },
        { title: "Optimization Opportunity", severity: "recommendation", description: "Consider enabling automated bidding for 'IO-01: Diwali Promo' to improve performance.", actions: ["Optimize"] }
    ];
    const kpiOptionsByGoal = {
        awareness: ["CPM", "Viewable %"],
        action: ["CTR", "CPA", "CPC"],
        installs: ["CPIAVC", "CPA"]
    };
    const myInventoryData = [
        { name: "Times of India - Homepage Takeover", type: "Programmatic Guaranteed", status: "Active" },
        { name: "Moneycontrol - Finance Section", type: "Preferred Deal", status: "Active" },
        { name: "Hotstar - Pre-roll Package", type: "Private Auction", status: "Paused" }
    ];
    const marketplacePublisherData = [
        { id: 1, name: "YouTube", impressions: "N/A", cookies: "N/A", display: "0%", video: "100%" },
        { id: 2, name: "ReklamUp", impressions: "18B", cookies: "-", display: "5%", video: "95%" },
        { id: 3, name: "Connrix Native Video", impressions: "9.48B", cookies: "54.6M", display: "0%", video: "50%" },
        { id: 4, name: "LG Ads Solutions", impressions: "6.95B", cookies: "127M", display: "0%", video: "50%" }
    ];

    // ===== DOM ELEMENT SELECTION =====
    const allViews = document.querySelectorAll('main > section');
    const sidebarNav = document.querySelector('.sidebar-nav');
    const navLinks = document.querySelectorAll('.sidebar-nav li');
    
    const campaignListContainer = document.getElementById('campaign-list');
    const ioListContainer = document.getElementById('insertion-order-list-container');
    const liListContainer = document.getElementById('line-item-list-container');
    const audienceListContainer = document.getElementById('audience-list-container');
    const creativeListContainer = document.getElementById('creative-list-container');
    const teamListContainer = document.getElementById('team-list-container');
    const formatGalleryContainer = document.getElementById('format-gallery-grid-container');
    const myInventoryListContainer = document.getElementById('my-inventory-list-container');
    const marketplaceTableContainer = document.getElementById('marketplace-table-container');

    const campaignTabs = document.querySelectorAll('#campaign-view .sub-navigation li');
    const campaignTabContents = document.querySelectorAll('#campaign-view .tab-content');
    const audienceTabs = document.querySelectorAll('#audiences-view .sub-navigation li');
    const audienceTabContents = document.querySelectorAll('#audiences-view .tab-content');
    const creativeTabs = document.querySelectorAll('#creatives-view .sub-navigation li');
    const creativeTabContents = document.querySelectorAll('#creatives-view .tab-content');
    const inventoryTabs = document.querySelectorAll('#inventory-view .sub-navigation li');
    const inventoryTabContents = document.querySelectorAll('#inventory-view .tab-content');
    
    const createCampaignBtn = document.getElementById('create-campaign-btn');
    const campaignModal = document.getElementById('campaign-modal-overlay');
    const newIoBtn = document.getElementById('new-insertion-order-btn');
    const ioModal = document.getElementById('io-modal-overlay');
    const newLineItemBtn = document.getElementById('new-line-item-btn');
    const liModal = document.getElementById('li-modal-overlay');
    const newUserBtn = document.getElementById('new-user-btn');
    const userModal = document.getElementById('user-modal-overlay');
    const adCanvasModal = document.getElementById('ad-canvas-modal-overlay');
    const intelligencePanel = document.getElementById('intelligence-panel');
    const openIntelligencePanelBtn = document.getElementById('open-intelligence-panel-btn');
    const troubleshootModal = document.getElementById('troubleshoot-modal-overlay');
    const requestProposalBtn = document.getElementById('request-proposal-btn');
    const compareBtn = document.getElementById('compare-btn');
    const rfpModal = document.getElementById('rfp-modal-overlay');
    const compareModal = document.getElementById('compare-modal-overlay');

    const runReportBtn = document.getElementById('run-report-btn');
    const vizTypeSelect = document.getElementById('visualization-type');
    const reportVisuals = document.querySelectorAll('.report-visual');
    const reportTableContainer = document.getElementById('report-table-container');
    let activeBarChart, activeLineChart, activePieChart;
    
    const campaignGoalSelect = document.getElementById('campaign-goal');
    const campaignKpiSelect = document.getElementById('campaign-kpi');

    // ===== HELPER FUNCTIONS =====
    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    const formatNumber = (num) => (num >= 1000000) ? `${(num / 1000000).toFixed(1)}M` : (num >= 1000) ? `${(num / 1000).toFixed(0)}K` : new Intl.NumberFormat('en-US').format(num);

    // ===== RENDER FUNCTIONS =====
    const renderCampaignList = (data) => { if (!campaignListContainer) return; let html = `<div id="campaign-table-container"><table><thead><tr><th>Campaign Name</th><th>Budget</th><th>Spent</th><th>KPI Goal</th><th>KPI Actual</th></tr></thead><tbody>`; data.forEach(c => { html += `<tr><td>${c.name}</td><td>${formatCurrency(c.budget)}</td><td>${formatCurrency(c.spent)}</td><td>${formatNumber(c.kpiGoal)}</td><td>${formatNumber(c.kpiActual)}</td></tr>`; }); html += `</tbody></table></div>`; campaignListContainer.innerHTML = html; };
    const renderInsertionOrderTable = (data) => { if (!ioListContainer) return; let html = `<div id="campaign-table-container"><table><thead><tr><th>IO Name</th><th>Campaign</th><th>Status</th><th>Spend / Budget</th></tr></thead><tbody>`; data.forEach(io => { html += `<tr><td>${io.name}</td><td>${io.campaign}</td><td><span class="status status-${io.status.toLowerCase()}">${io.status}</span></td><td>${formatCurrency(io.spent)} / ${formatCurrency(io.budget)}</td></tr>`; }); html += `</tbody></table></div>`; ioListContainer.innerHTML = html; };
    const renderLineItemTable = (data) => { if (!liListContainer) return; let html = `<div id="campaign-table-container"><table><thead><tr><th>Line Item Name</th><th>Insertion Order</th><th>Type</th><th>Status</th></tr></thead><tbody>`; data.forEach(li => { html += `<tr><td>${li.name}</td><td>${li.insertionOrder}</td><td>${li.type}</td><td><span class="status status-${li.status.toLowerCase().replace(' ', '-')}">${li.status}</span></td></tr>`; }); html += `</tbody></table></div>`; liListContainer.innerHTML = html; };
    const renderAudienceTable = (data) => { if (!audienceListContainer) return; let html = `<div id="campaign-table-container"><table><thead><tr><th>Audience Name</th><th>Type</th><th>Source</th><th>Size (Users)</th></tr></thead><tbody>`; data.forEach(a => { html += `<tr><td>${a.name}</td><td>${a.type}</td><td>${a.source}</td><td><ul class="audience-size-list"><li><span class="media-type">Display:</span> <strong>${formatNumber(a.size.display)}</strong></li><li><span class="media-type">YouTube:</span> <strong>${formatNumber(a.size.youtube)}</strong></li><li><span class="media-type">Mobile:</span> <strong>${formatNumber(a.size.mobile)}</strong></li></ul></td></tr>`; }); html += `</tbody></table></div>`; audienceListContainer.innerHTML = html; };
    const renderCreativeTable = (data) => { if (!creativeListContainer) return; let html = `<div id="campaign-table-container"><table><thead><tr><th>Preview</th><th>Name</th><th>Type</th><th>Dimensions</th><th>Status</th><th>Actions</th></tr></thead><tbody>`; data.forEach(c => { html += `<tr><td><img src="${c.imageUrl}" alt="preview" style="height: 30px; vertical-align: middle;"></td><td>${c.name}</td><td>${c.type}</td><td>${c.dimensions}</td><td><span class="status status-${c.status.toLowerCase().replace(' ', '-')}">${c.status}</span></td><td><button class="preview-btn" data-creative-id="${c.id}">Preview</button></td></tr>`; }); html += `</tbody></table></div>`; creativeListContainer.innerHTML = html; };
    const renderTeamMembers = (data) => { if (!teamListContainer) return; let html = ''; data.forEach(m => { html += `<div class="team-member-card"><div class="team-member-avatar">${m.initials}</div><div class="team-member-details"><h4>${m.name}</h4><p>${m.role}</p></div></div>`; }); teamListContainer.innerHTML = html; };
    const renderFormatGallery = (data) => { if (!formatGalleryContainer) return; let html = ''; data.forEach(f => { html += `<div class="format-card"><div class="card-content"><h4>${f.name}</h4><p>${f.description}</p></div><div class="card-actions"><button class="create-btn format-create-btn" data-creative-id="${f.creativeId}">Create</button></div></div>`; }); formatGalleryContainer.innerHTML = html; };
    const renderReportTable = (data) => { if (!reportTableContainer) return; let html = `<div id="campaign-table-container"><table><thead><tr><th>Dimension</th><th>Metric</th></tr></thead><tbody>`; data.labels.forEach((label, index) => { html += `<tr><td>${label}</td><td>${formatNumber(data.data[index])}</td></tr>`; }); html += `</tbody></table></div>`; reportTableContainer.innerHTML = html; };
    const renderChart = (canvasId, chartInstance, type, data, label) => { const canvasEl = document.getElementById(canvasId); if (!canvasEl) return; if (chartInstance) chartInstance.destroy(); const datasets = [{ label, data: data.data, backgroundColor: ['#1a73e8', '#fbbc05', '#34a853', '#ea4335', '#4285f4'], borderColor: '#1a73e8', fill: false }]; return new Chart(canvasEl.getContext('2d'), { type, data: { labels: data.labels, datasets }, options: { responsive: true, maintainAspectRatio: false } }); };
    const renderIntelligencePanel = (alerts) => { const panelContent = document.getElementById('intelligence-panel-content'); if (!panelContent) return; let html = ''; alerts.forEach(alert => { const actionsHtml = alert.actions.map(action => `<button class="action-btn">${action}</button>`).join(''); html += `<div class="insight-card"><div class="insight-header ${alert.severity}">${alert.title}</div><div class="insight-body">${alert.description}</div><div class="insight-actions">${actionsHtml}</div></div>`; }); panelContent.innerHTML = html; };
    const renderMyInventoryTable = (data) => { if (!myInventoryListContainer) return; let html = `<div id="campaign-table-container"><table><thead><tr><th>Deal Name</th><th>Type</th><th>Status</th></tr></thead><tbody>`; data.forEach(deal => { html += `<tr><td>${deal.name}</td><td>${deal.type}</td><td><span class="status status-${deal.status.toLowerCase()}">${deal.status}</span></td></tr>`; }); html += `</tbody></table></div>`; myInventoryListContainer.innerHTML = html; };
    const renderMarketplaceTable = (data) => { if (!marketplaceTableContainer) return; let html = `<div id="campaign-table-container"><table><thead><tr><th><input type="checkbox" id="select-all-publishers"></th><th>Publisher</th><th>Impressions</th><th>Cookies</th><th>Display</th><th>Video</th></tr></thead><tbody>`; data.forEach(p => { html += `<tr data-id="${p.id}"><td><input type="checkbox" class="publisher-checkbox"></td><td><strong>${p.name}</strong></td><td>${p.impressions}</td><td>${p.cookies}</td><td>${p.display}</td><td>${p.video}</td></tr>`; }); html += `</tbody></table></div>`; marketplaceTableContainer.innerHTML = html; };
    const renderCompareModal = (selectedPublishers) => { const grid = document.getElementById('compare-grid-container'); if (!grid) return; let html = ''; selectedPublishers.forEach(p => { const fullData = marketplacePublisherData.find(pub => pub.id === p); html += `<div class="compare-card"><h4>${fullData.name}</h4><p><strong>Impressions:</strong> ${fullData.impressions}</p><p><strong>Cookies:</strong> ${fullData.cookies}</p><p><strong>Display / Video:</strong> ${fullData.display} / ${fullData.video}</p></div>`; }); grid.innerHTML = html;};
    
    const updateKpiOptions = () => { if (!campaignGoalSelect || !campaignKpiSelect) return; const selectedGoal = campaignGoalSelect.value; const kpiOptions = kpiOptionsByGoal[selectedGoal] || []; campaignKpiSelect.innerHTML = kpiOptions.map(kpi => `<option>${kpi}</option>`).join(''); };

    // ===== EVENT LISTENERS =====
    const showView = (viewId) => { allViews.forEach(v => v.classList.add('hidden')); const vts = document.getElementById(viewId); if (vts) vts.classList.remove('hidden'); };
    if (sidebarNav) { sidebarNav.addEventListener('click', (event) => { event.preventDefault(); const link = event.target.closest('a'); if (!link) return; navLinks.forEach(l => l.classList.remove('active')); link.parentElement.classList.add('active'); const text = link.textContent.toLowerCase(); let viewId = 'campaign-view'; if (text.includes('audiences')) viewId = 'audiences-view'; else if (text.includes('creatives')) viewId = 'creatives-view'; else if (text.includes('inventory')) viewId = 'inventory-view'; else if (text.includes('reporting')) viewId = 'reporting-view'; showView(viewId); }); }
    
    const setupTabs = (tabs, contents) => { if (tabs && contents.length) { tabs.forEach(tab => tab.addEventListener('click', () => { const id = tab.dataset.tab; tabs.forEach(t => t.classList.remove('active-tab')); tab.classList.add('active-tab'); contents.forEach(c => c.classList.toggle('active-tab-content', c.id === `${id}-content`)); })); }};
    setupTabs(campaignTabs, campaignTabContents);
    setupTabs(audienceTabs, audienceTabContents);
    setupTabs(creativeTabs, creativeTabContents);
    setupTabs(inventoryTabs, inventoryTabContents);

    const setupModal = (btn, modal, onsubmit) => { if (!btn || !modal) return; const form = modal.querySelector('form'); const steps = modal.querySelectorAll('.form-step'); const nextBtn = modal.querySelector('[id*="-next-btn"]') || modal.querySelector('.create-btn'); const backBtn = modal.querySelector('[id*="-back-btn"]'); const submitBtn = modal.querySelector('[id*="-submit-btn"]') || (form ? form.querySelector('[type="submit"]') : null); let currentStep = 0; const openModal = () => { currentStep = 0; showStep(0); if (form) form.reset(); modal.classList.remove('hidden'); }; const closeModal = () => modal.classList.add('hidden'); const showStep = (i) => { if (steps && steps.length > 0) { steps.forEach((s, ix) => s.classList.toggle('active-step', ix === i)); } if (backBtn) backBtn.classList.toggle('hidden', i === 0); if (nextBtn && steps.length > 0) nextBtn.classList.toggle('hidden', i === steps.length - 1); if (submitBtn && steps.length > 0) submitBtn.classList.toggle('hidden', i !== steps.length - 1); }; btn.addEventListener('click', openModal); modal.querySelector('.close-btn').addEventListener('click', closeModal); if (nextBtn) nextBtn.addEventListener('click', () => { if (steps && currentStep < steps.length - 1) { currentStep++; showStep(currentStep); } }); if (backBtn) backBtn.addEventListener('click', () => { if (currentStep > 0) { currentStep--; showStep(currentStep); } }); if (form) form.addEventListener('submit', (e) => { e.preventDefault(); onsubmit(closeModal); }); };
    
    setupModal(createCampaignBtn, campaignModal, (close) => { const nc = { name: campaignModal.querySelector('#campaign-name').value, budget: parseFloat(campaignModal.querySelector('#planned-spend').value) || 0, spent: 0, kpiGoal: 1, kpiActual: 0 }; campaignListData.push(nc); renderCampaignList(campaignListData); close(); });
    setupModal(newIoBtn, ioModal, (close) => { const nio = { name: ioModal.querySelector('#line-item-name').value, campaign: "Pre-Diwali Brand Awareness", status: "Active", budget: 0, spent: 0 }; insertionOrderData.push(nio); renderInsertionOrderTable(insertionOrderData); alert("New Insertion Order & Line Item Created!"); close(); });
    setupModal(newLineItemBtn, liModal, (close) => { const nli = { name: liModal.querySelector('#li-name').value, insertionOrder: "IO-01: Diwali Promo", type: liModal.querySelector('#li-type').value, status: "In Review" }; lineItemData.push(nli); renderLineItemTable(lineItemData); close(); });
    setupModal(newUserBtn, userModal, (close) => { alert('New user added!'); close(); });
    setupModal(requestProposalBtn, rfpModal, (close) => { alert('RFP Sent!'); close(); });
    setupModal(compareBtn, compareModal, () => {});

    if (adCanvasModal) { const openAdCanvas = (creativeId) => { const creative = creativeListData.find(c => c.id === creativeId); if (!creative) return; adCanvasModal.querySelector('#ad-canvas-title').textContent = `Ad Canvas: ${creative.name}`; adCanvasModal.querySelector('#ad-canvas-image').src = creative.imageUrl; const defaultDevice = adCanvasModal.querySelector('[data-size="300x250"]'); if (defaultDevice) defaultDevice.click(); adCanvasModal.classList.remove('hidden'); }; adCanvasModal.querySelector('.close-btn').addEventListener('click', () => adCanvasModal.classList.add('hidden')); if (creativeListContainer) { creativeListContainer.addEventListener('click', (e) => { if (e.target.classList.contains('preview-btn')) { openAdCanvas(parseInt(e.target.dataset.creativeId, 10)); } }); } if (formatGalleryContainer) { formatGalleryContainer.addEventListener('click', (e) => { if (e.target.classList.contains('format-create-btn')) { openAdCanvas(parseInt(e.target.dataset.creativeId, 10)); } }); } const adCanvasPreviewArea = adCanvasModal.querySelector('.ad-canvas-preview-area'); const deviceSwitcher = adCanvasModal.querySelector('.device-switcher'); if (deviceSwitcher) { deviceSwitcher.addEventListener('click', (e) => { if (e.target.classList.contains('device-btn')) { const [w, h] = e.target.dataset.size.split('x'); adCanvasPreviewArea.style.aspectRatio = `${w} / ${h}`; deviceSwitcher.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active-device')); e.target.classList.add('active-device'); } }); }}
    
    if (runReportBtn) { runReportBtn.addEventListener('click', () => { const vizType = vizTypeSelect.value; const data = (document.getElementById('report-dimension').value === 'Date') ? reportData.date : reportData.campaign; reportVisuals.forEach(v => v.classList.remove('active-visual')); let container; switch (vizType) { case 'bar': activeBarChart = renderChart('bar-chart-canvas', activeBarChart, 'bar', data, 'Impressions'); container = document.getElementById('bar-chart-canvas')?.parentElement; break; case 'line': activeLineChart = renderChart('line-chart-canvas', activeLineChart, 'line', data, 'Impressions by Date'); container = document.getElementById('line-chart-canvas')?.parentElement; break; case 'pie': activePieChart = renderChart('pie-chart-canvas', activePieChart, 'pie', data, 'Impressions'); container = document.getElementById('pie-chart-canvas')?.parentElement; break; default: renderReportTable(data); container = reportTableContainer; break; } if (container) container.classList.add('active-visual'); }); }

    if (intelligencePanel) { openIntelligencePanelBtn.addEventListener('click', () => intelligencePanel.classList.add('open')); document.getElementById('close-intelligence-panel-btn').addEventListener('click', () => intelligencePanel.classList.remove('open')); const panelContent = document.getElementById('intelligence-panel-content'); if (panelContent) { panelContent.addEventListener('click', (e) => { if (e.target.classList.contains('action-btn') && e.target.textContent === 'Troubleshoot') { if (troubleshootModal) troubleshootModal.classList.remove('hidden'); } }); } }
    if (troubleshootModal) { troubleshootModal.querySelector('.close-btn').addEventListener('click', () => troubleshootModal.classList.add('hidden')); }
    if (campaignGoalSelect) { campaignGoalSelect.addEventListener('change', updateKpiOptions); }
    if (marketplaceTableContainer) { const updateSelectionBar = () => { const selectedCheckboxes = marketplaceTableContainer.querySelectorAll('.publisher-checkbox:checked'); const count = selectedCheckboxes.length; const actionBar = document.getElementById('selection-action-bar'); if(actionBar) { if (count > 0) { actionBar.classList.remove('hidden'); actionBar.querySelector('#selection-count').textContent = `${count} row${count > 1 ? 's' : ''} selected`; requestProposalBtn.disabled = false; compareBtn.disabled = count > 3 || count < 2; } else { actionBar.classList.add('hidden'); } } }; marketplaceTableContainer.addEventListener('change', (e) => { const target = e.target; if (target.id === 'select-all-publishers') { marketplaceTableContainer.querySelectorAll('.publisher-checkbox').forEach(cb => { cb.checked = target.checked; cb.closest('tr').classList.toggle('selected-row', target.checked); }); } else if (target.classList.contains('publisher-checkbox')) { target.closest('tr').classList.toggle('selected-row', target.checked); } updateSelectionBar(); }); }
    if(rfpModal) { requestProposalBtn.addEventListener('click', () => { const selectedCards = marketplaceTableContainer.querySelectorAll('.selected-row'); const publisherList = rfpModal.querySelector('#rfp-publisher-list'); if(publisherList) { publisherList.innerHTML = ''; selectedCards.forEach(card => { const li = document.createElement('li'); li.textContent = marketplacePublisherData.find(p => p.id === parseInt(card.dataset.id)).name; publisherList.appendChild(li); }); } }); }
    if(compareModal) { compareBtn.addEventListener('click', () => { const selectedIds = Array.from(marketplaceTableContainer.querySelectorAll('.selected-row')).map(row => parseInt(row.dataset.id)); renderCompareModal(selectedIds); }); }

    // ===== INITIALIZATION =====
    showView('campaign-view');
    renderCampaignList(campaignListData);
    renderInsertionOrderTable(insertionOrderData);
    renderLineItemTable(lineItemData);
    renderAudienceTable(audienceListData);
    renderCreativeTable(creativeListData); 
    renderTeamMembers(teamMemberData);
    renderFormatGallery(formatGalleryData);
    renderReportTable(reportData.campaign);
    renderIntelligencePanel(intelligenceAlertsData);
    updateKpiOptions();
    renderMyInventoryTable(myInventoryData);
    renderMarketplaceTable(marketplacePublisherData);
});
