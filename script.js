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
    let audienceListData = [
        { name: "Homepage Visitors (Last 30d)", type: "1st Party", source: "Advertiser", size: { display: 1800000, youtube: 950000, mobile: 1200000 } },
        { name: "High-Intent Car Buyers", type: "Google Audience", source: "Google Ads", size: { display: 25000000, youtube: 15000000, mobile: 18000000 } }
    ];
    let combinedAudienceData = [];
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
    let offlineReportsData = [];
    const intelligenceAlertsData = [
        { title: "Underpacing Insertion Order", severity: "warning", description: "IO-02: Remarketing is projected to underspend its budget by 45%.", actions: ["Troubleshoot", "Details"] },
        { title: "Creative Approval Needed", severity: "warning", description: "1 creative in 'Pre-Diwali Brand Awareness' is still in review.", actions: ["Details"] },
        { title: "Optimization Opportunity", severity: "recommendation", description: "Consider enabling automated bidding for 'IO-01: Diwali Promo' to improve performance.", actions: ["Optimize"] }
    ];
    const kpiOptionsByGoal = {
        awareness: ["CPM", "Viewable %"],
        action: ["CTR", "CPA", "CPC"],
        offline: ["CPA"],
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
    const negotiationsData = [
        { name: "Google Finance 2025 PG", seller: "Google Merchandise Store", status: "Active", startDate: "Jul 9, 2025" }
    ];
    const inventoryPackagesData = [
        { name: "Google Curated Package - US Hispanic", id: "5496443...", exchange: "Google Ad Manager", impressions: "788M", uniques: "28.2M" },
        { name: "GCP Holiday Season Shopping", id: "5496443...", exchange: "Google Ad Manager", impressions: "33.6B", uniques: "1.68B" },
    ];
    const featuredPublishersData = [
        { name: "YouTube", logo: "https://placehold.co/48x48/FF0000/FFFFFF?text=YT", isInstant: false },
        { name: "Google Ad Manager", logo: "https://placehold.co/48x48/e8f0fe/1a73e8?text=G", isInstant: true },
        { name: "Hulu", logo: "https://placehold.co/48x48/1CE783/FFFFFF?text=h", isInstant: false },
    ];
    
    // ===== DOM ELEMENT SELECTION =====
    const allViews = document.querySelectorAll('main > section');
    const sidebarNav = document.querySelector('.sidebar-nav');
    const navLinks = document.querySelectorAll('.sidebar-nav li');
    
    const campaignListContainer = document.getElementById('campaign-list');
    const ioListContainer = document.getElementById('insertion-order-list-container');
    const liListContainer = document.getElementById('line-item-list-container');
    const audienceListContainer = document.getElementById('audience-list-container');
    const combinedAudienceListContainer = document.getElementById('combined-audience-list-container');
    const creativeListContainer = document.getElementById('creative-list-container');
    const teamListContainer = document.getElementById('team-list-container');
    const formatGalleryContainer = document.getElementById('format-gallery-grid-container');
    const myInventoryListContainer = document.getElementById('my-inventory-list-container');
    const marketplaceTableContainer = document.getElementById('marketplace-table-container');
    const negotiationsListContainer = document.getElementById('negotiations-list-container');
    const inventoryPackagesContainer = document.getElementById('inventory-packages-container');
    const featuredPublishersContainer = document.getElementById('featured-publishers-container');
    const offlineReportListContainer = document.getElementById('offline-report-list-container');

    const campaignTabs = document.querySelectorAll('#campaign-view .sub-navigation li');
    const campaignTabContents = document.querySelectorAll('#campaign-view .tab-content');
    const audienceTabs = document.querySelectorAll('#audiences-view .sub-navigation li');
    const audienceTabContents = document.querySelectorAll('#audiences-view .tab-content');
    const creativeTabs = document.querySelectorAll('#creatives-view .sub-navigation li');
    const creativeTabContents = document.querySelectorAll('#creatives-view .tab-content');
    const inventoryTabs = document.querySelectorAll('#inventory-view .sub-navigation li');
    const inventoryTabContents = document.querySelectorAll('#inventory-view .tab-content');
    const insightsTabs = document.querySelectorAll('#insights-view .sub-navigation li');
    const insightsTabContents = document.querySelectorAll('#insights-view .tab-content');
    const marketplaceTopTabs = document.querySelectorAll('.marketplace-top-tab');
    const marketplaceTopTabContents = document.querySelectorAll('.marketplace-top-tab-content');
    const marketplaceSubTabs = document.querySelectorAll('.marketplace-tabs.sub .marketplace-sub-tab');
    const marketplaceSubTabContents = document.querySelectorAll('.marketplace-sub-tab-content');
    
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
    const packageDetailsModal = document.getElementById('package-details-modal');
    const assignToLiBtn = document.getElementById('assign-to-li-btn');
    const assignDealModal = document.getElementById('assign-deal-modal');
    const exchangeDetailsModal = document.getElementById('exchange-details-modal');
    const newInstantDealBtn = document.getElementById('new-instant-deal-btn');
    const instantDealModal = document.getElementById('instant-deal-modal');
    const newAudienceBtn = document.getElementById('new-audience-btn');
    const audienceBuilderModal = document.getElementById('audience-builder-homepage-modal');
    const activityAudienceModal = document.getElementById('activity-audience-modal');
    const combinedAudienceModal = document.getElementById('combined-audience-modal');
    const audiencePickerModal = document.getElementById('audience-picker-modal');
    const headerInsightsBtn = document.getElementById('header-insights-btn');
    const newOfflineReportBtn = document.getElementById('new-offline-report-btn');
    const reportBuilderModal = document.getElementById('report-builder-modal');
    const demographicsModal = document.getElementById('demographics-modal-overlay');
    const geographyModal = document.getElementById('geography-modal-overlay');
    const languageModal = document.getElementById('language-modal-overlay');
    
    const campaignGoalSelect = document.getElementById('campaign-goal');
    const campaignKpiSelect = document.getElementById('campaign-kpi');

    const ioTargetingModals = {
        'brand-safety-io': document.getElementById('brand-safety-io-modal'),
        'environment-io': document.getElementById('environment-io-modal'),
        'viewability-io': document.getElementById('viewability-io-modal'),
        'apps-urls': document.getElementById('apps-urls-io-modal'),
        'keywords': document.getElementById('keywords-io-modal'),
        'categories-genres': document.getElementById('categories-genres-io-modal'),
        'position': document.getElementById('position-io-modal'),
        'audio-video': document.getElementById('audio-video-io-modal'),
        'user-rewarded-content': document.getElementById('user-rewarded-content-io-modal'),
    };

    const liTargetingModals = {
        'audience-lists': document.getElementById('li-audience-lists-modal'),
        'day-time': document.getElementById('li-day-time-modal'),
        'demographics': demographicsModal, // Reuse existing modal
        'technology': document.getElementById('li-technology-modal'),
        'geography': geographyModal, // Reuse existing modal
        'language': languageModal, // Reuse existing modal
        'keywords': ioTargetingModals['keywords'], // Reuse existing modal
        'categories-genres': ioTargetingModals['categories-genres'], // Reuse existing modal
        'apps-urls': ioTargetingModals['apps-urls'], // Reuse existing modal
        'position': ioTargetingModals['position'], // Reuse existing modal
    };


    // ===== HELPER FUNCTIONS =====
    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    const formatNumber = (num) => (num >= 1000000) ? `${(num / 1000000).toFixed(1)}M` : (num >= 1000) ? `${(num / 1000).toFixed(0)}K` : new Intl.NumberFormat('en-US').format(num);

    // ===== RENDER FUNCTIONS =====
    const renderCampaignList = (data) => { if (!campaignListContainer) return; let html = `<div id="campaign-table-container"><table><thead><tr><th>Campaign Name</th><th>Budget</th><th>Spent</th><th>KPI Goal</th><th>KPI Actual</th></tr></thead><tbody>`; data.forEach(c => { html += `<tr><td>${c.name}</td><td>${formatCurrency(c.budget)}</td><td>${formatCurrency(c.spent)}</td><td>${c.kpiGoal}</td><td>${formatNumber(c.kpiActual)}</td></tr>`; }); html += `</tbody></table></div>`; campaignListContainer.innerHTML = html; };
    const renderInsertionOrderTable = (data) => { if (!ioListContainer) return; let html = `<div id="campaign-table-container"><table><thead><tr><th>IO Name</th><th>Campaign</th><th>Status</th><th>Spend / Budget</th></tr></thead><tbody>`; data.forEach(io => { html += `<tr><td>${io.name}</td><td>${io.campaign}</td><td><span class="status status-${io.status.toLowerCase()}">${io.status}</span></td><td>${formatCurrency(io.spent)} / ${formatCurrency(io.budget)}</td></tr>`; }); html += `</tbody></table></div>`; ioListContainer.innerHTML = html; };
    const renderLineItemTable = (data) => { if (!liListContainer) return; let html = `<div id="campaign-table-container"><table><thead><tr><th>Line Item Name</th><th>Insertion Order</th><th>Type</th><th>Status</th></tr></thead><tbody>`; data.forEach(li => { html += `<tr><td>${li.name}</td><td>${li.insertionOrder}</td><td>${li.type}</td><td><span class="status status-${li.status.toLowerCase().replace(' ', '-')}">${li.status}</span></td></tr>`; }); html += `</tbody></table></div>`; liListContainer.innerHTML = html; };
    const renderAudienceTable = (data) => { if (!audienceListContainer) return; let html = `<div id="campaign-table-container"><table><thead><tr><th>Audience Name</th><th>Type</th><th>Source</th><th>Size (Users)</th></tr></thead><tbody>`; data.forEach(a => { html += `<tr><td>${a.name}</td><td>${a.type}</td><td>${a.source}</td><td><ul class="audience-size-list"><li><span class="media-type">Display:</span> <strong>${formatNumber(a.size.display)}</strong></li><li><span class="media-type">YouTube:</span> <strong>${formatNumber(a.size.youtube)}</strong></li><li><span class="media-type">Mobile:</span> <strong>${formatNumber(a.size.mobile)}</strong></li></ul></td></tr>`; }); html += `</tbody></table></div>`; audienceListContainer.innerHTML = html; };
    const renderCombinedAudienceTable = (data) => { if (!combinedAudienceListContainer) return; let html = `<div id="campaign-table-container"><table><thead><tr><th>Name</th><th>Type</th><th>Source</th></tr></thead><tbody>`; if (data.length === 0) { html += `<tr><td colspan="3" style="text-align:center; color: var(--text-light);">No combined audiences created yet.</td></tr>`; } else { data.forEach(c => { html += `<tr><td>${c.name}</td><td><span class="status status-in-review">${c.type}</span></td><td>${c.source}</td></tr>`; }); } html += `</tbody></table></div>`; combinedAudienceListContainer.innerHTML = html; };
    const renderCreativeTable = (data) => { if (!creativeListContainer) return; let html = `<div id="campaign-table-container"><table><thead><tr><th>Preview</th><th>Name</th><th>Type</th><th>Dimensions</th><th>Status</th><th>Actions</th></tr></thead><tbody>`; data.forEach(c => { html += `<tr><td><img src="${c.imageUrl}" alt="preview" style="height: 30px; vertical-align: middle;"></td><td>${c.name}</td><td>${c.type}</td><td>${c.dimensions}</td><td><span class="status status-${c.status.toLowerCase().replace(' ', '-')}">${c.status}</span></td><td><button class="preview-btn" data-creative-id="${c.id}">Preview</button></td></tr>`; }); html += `</tbody></table></div>`; creativeListContainer.innerHTML = html; };
    const renderTeamMembers = (data) => { if (!teamListContainer) return; let html = ''; data.forEach(m => { html += `<div class="team-member-card"><div class="team-member-avatar">${m.initials}</div><div class="team-member-details"><h4>${m.name}</h4><p>${m.role}</p></div></div>`; }); teamListContainer.innerHTML = html; };
    const renderFormatGallery = (data) => { if (!formatGalleryContainer) return; let html = ''; data.forEach(f => { html += `<div class="format-card"><div class="card-content"><h4>${f.name}</h4><p>${f.description}</p></div><div class="card-actions"><button class="create-btn format-create-btn" data-creative-id="${f.creativeId}">Create</button></div></div>`; }); formatGalleryContainer.innerHTML = html; };
    const renderIntelligencePanel = (alerts) => { const panelContent = document.getElementById('intelligence-panel-content'); if (!panelContent) return; let html = ''; alerts.forEach(alert => { const actionsHtml = alert.actions.map(action => `<button class="action-btn">${action}</button>`).join(''); html += `<div class="insight-card"><div class="insight-header ${alert.severity}">${alert.title}</div><div class="insight-body">${alert.description}</div><div class="insight-actions">${actionsHtml}</div></div>`; }); panelContent.innerHTML = html; };
    const renderMyInventoryTable = (data) => { if (!myInventoryListContainer) return; let html = `<div id="campaign-table-container"><table><thead><tr><th>Deal Name</th><th>Type</th><th>Status</th></tr></thead><tbody>`; data.forEach(deal => { html += `<tr><td>${deal.name}</td><td>${deal.type}</td><td><span class="status status-${deal.status.toLowerCase()}">${deal.status}</span></td></tr>`; }); html += `</tbody></table></div>`; myInventoryListContainer.innerHTML = html; };
    const renderMarketplaceTable = (data) => { if (!marketplaceTableContainer) return; let html = `<div id="campaign-table-container"><table><thead><tr><th><input type="checkbox" id="select-all-publishers"></th><th>Publisher</th><th>Impressions</th><th>Cookies</th><th>Display</th><th>Video</th></tr></thead><tbody>`; data.forEach(p => { html += `<tr data-id="${p.id}"><td><input type="checkbox" class="publisher-checkbox"></td><td><strong>${p.name}</strong></td><td>${p.impressions}</td><td>${p.cookies}</td><td>${p.display}</td><td>${p.video}</td></tr>`; }); html += `</tbody></table></div>`; marketplaceTableContainer.innerHTML = html; };
    const renderCompareModal = (selectedPublishers) => { const grid = document.getElementById('compare-grid-container'); if (!grid) return; let html = ''; selectedPublishers.forEach(p => { const fullData = marketplacePublisherData.find(pub => pub.id === p); html += `<div class="compare-card"><h4>${fullData.name}</h4><p><strong>Impressions:</strong> ${fullData.impressions}</p><p><strong>Cookies:</strong> ${fullData.cookies}</p><p><strong>Display / Video:</strong> ${fullData.display} / ${fullData.video}</p></div>`; }); grid.innerHTML = html;};
    const renderNegotiationsTable = (data) => { if (!negotiationsListContainer) return; let html = `<div id="campaign-table-container"><table><thead><tr><th>Name</th><th>Seller</th><th>Status</th><th>Start Date</th></tr></thead><tbody>`; data.forEach(n => { html += `<tr><td>${n.name}</td><td>${n.seller}</td><td><span class="status status-${n.status.toLowerCase()}">${n.status}</span></td><td>${n.startDate}</td></tr>`; }); html += `</tbody></table></div>`; negotiationsListContainer.innerHTML = html; };
    const renderInventoryPackages = (data) => { if (!inventoryPackagesContainer) return; let html = `<div id="campaign-table-container"><table><thead><tr><th>Auction Package</th><th>ID</th><th>Exchange</th><th>Impressions</th><th>Uniques</th></tr></thead><tbody>`; data.forEach(p => { html += `<tr class="package-row"><td><a href="#" class="package-link">${p.name}</a></td><td>${p.id}</td><td>${p.exchange}</td><td>${p.impressions}</td><td>${p.uniques}</td></tr>`; }); html += `</tbody></table></div>`; inventoryPackagesContainer.innerHTML = html; };
    const renderFeaturedPublishers = (data) => { if (!featuredPublishersContainer) return; let html = ''; data.forEach(p => { html += `<div class="featured-card" data-instant="${p.isInstant}">${p.isInstant ? '<div class="instant-deal-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 21L14.4 12.5L10.5 10.5L12 3L4.4 12.5L8.5 14.5L7 21Z"/></svg></div>' : ''}<img src="${p.logo}" alt="${p.name} logo"><p>${p.name}</p></div>`; }); featuredPublishersContainer.innerHTML = html; };
    const renderOfflineReportsTable = (data) => { if (!offlineReportListContainer) return; if (data.length === 0) { offlineReportListContainer.innerHTML = `<p style="text-align: center; color: var(--text-light); padding: 40px;">No offline reports have been created yet.</p>`; return; } let html = `<div id="campaign-table-container"><table><thead><tr><th>Report Name</th><th>Report Type</th><th>Date Range</th><th>Created By</th><th>Last Run</th></tr></thead><tbody>`; data.forEach(report => { html += `<tr><td>${report.name}</td><td><span class="status status-in-review">${report.type}</span></td><td>${report.dateRange}</td><td>student@example.com</td><td>${report.lastRun}</td></tr>`; }); html += `</tbody></table></div>`; offlineReportListContainer.innerHTML = html; };
    const updateKpiOptions = () => { if (!campaignGoalSelect || !campaignKpiSelect) return; const selectedGoal = campaignGoalSelect.value; const kpiOptions = kpiOptionsByGoal[selectedGoal] || []; campaignKpiSelect.innerHTML = kpiOptions.map(kpi => `<option>${kpi}</option>`).join(''); };
    
    // ===== EVENT LISTENERS =====
    const showView = (viewId) => { allViews.forEach(v => v.classList.add('hidden')); const vts = document.getElementById(viewId); if (vts) vts.classList.remove('hidden'); };
    if (sidebarNav) { sidebarNav.addEventListener('click', (event) => { event.preventDefault(); const link = event.target.closest('a'); if (!link) return; navLinks.forEach(l => l.classList.remove('active')); link.parentElement.classList.add('active'); const text = link.textContent.toLowerCase(); let viewId = 'campaign-view'; if (text.includes('audiences')) viewId = 'audiences-view'; else if (text.includes('creatives')) viewId = 'creatives-view'; else if (text.includes('inventory')) viewId = 'inventory-view'; else if (text.includes('insights')) viewId = 'insights-view'; showView(viewId); }); }
    
    const setupTabs = (tabs, contents) => {
        if (!tabs || !contents.length) return;
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                tabs.forEach(t => t.classList.remove('active-tab'));
                tab.classList.add('active-tab');
                contents.forEach(content => {
                    const isMatch = (content.id === `${tabId}-content` || content.id === tabId);
                    content.classList.toggle('active-tab-content', isMatch);
                });
            });
        });
    };

    setupTabs(campaignTabs, campaignTabContents);
    setupTabs(audienceTabs, audienceTabContents);
    setupTabs(creativeTabs, creativeTabContents);
    setupTabs(inventoryTabs, inventoryTabContents);
    setupTabs(insightsTabs, insightsTabContents);

    const setupSubTabs = (tabs, contents) => { if (tabs && contents.length) { tabs.forEach(tab => { tab.addEventListener('click', (e) => { const id = e.target.dataset.tab; tabs.forEach(t => t.classList.remove('active')); e.target.classList.add('active'); contents.forEach(c => c.classList.toggle('active', c.id === id)); }); }); }};
    setupSubTabs(marketplaceTopTabs, marketplaceTopTabContents);
    setupSubTabs(marketplaceSubTabs, marketplaceSubTabContents);

    const setupModal = (btn, modal, onsubmit) => { if (!btn || !modal) return; const form = modal.querySelector('form'); const steps = modal.querySelectorAll('.form-step'); const nextBtn = modal.querySelector('[id*="-next-btn"]') || modal.querySelector('.create-btn'); const backBtn = modal.querySelector('[id*="-back-btn"]'); const submitBtn = modal.querySelector('[id*="-submit-btn"]') || (form ? form.querySelector('[type="submit"]') : null); let currentStep = 0; const openModal = () => { currentStep = 0; showStep(0); if (form) form.reset(); modal.classList.remove('hidden'); }; const closeModal = () => modal.classList.add('hidden'); const showStep = (i) => { if (steps && steps.length > 0) { steps.forEach((s, ix) => s.classList.toggle('active-step', ix === i)); } if (backBtn) backBtn.classList.toggle('hidden', i === 0); if (nextBtn && steps.length > 0) nextBtn.classList.toggle('hidden', i === steps.length - 1); if (submitBtn && steps.length > 0) submitBtn.classList.toggle('hidden', i !== steps.length - 1); }; btn.addEventListener('click', openModal); modal.querySelector('.close-btn').addEventListener('click', closeModal); if (nextBtn) nextBtn.addEventListener('click', () => { if (steps && currentStep < steps.length - 1) { currentStep++; showStep(currentStep); } }); if (backBtn) backBtn.addEventListener('click', () => { if (currentStep > 0) { currentStep--; showStep(currentStep); } }); if (form) form.addEventListener('submit', (e) => { e.preventDefault(); onsubmit(closeModal); }); };
    
    const setupCampaignModal = () => {
        if (!createCampaignBtn || !campaignModal) return;
        createCampaignBtn.addEventListener('click', () => campaignModal.classList.remove('hidden'));
        campaignModal.querySelector('.modal-header .close-btn').addEventListener('click', () => campaignModal.classList.add('hidden'));
        campaignModal.querySelector('.form-navigation .secondary-btn').addEventListener('click', () => campaignModal.classList.add('hidden'));

        const freqCapRadios = campaignModal.querySelectorAll('input[name="frequency-cap"]');
        const freqCapSettings = campaignModal.querySelector('.freq-cap-settings');
        if (freqCapRadios && freqCapSettings) {
            freqCapRadios.forEach(radio => {
                radio.addEventListener('change', (e) => {
                    freqCapSettings.classList.toggle('hidden', e.target.value !== 'limit-exposure');
                });
            });
        }

        const targetingBtns = campaignModal.querySelectorAll('.edit-targeting-btn');
        targetingBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetType = e.currentTarget.dataset.target;
                if (targetType === 'demographics' && demographicsModal) demographicsModal.classList.remove('hidden');
                else if (targetType === 'geography' && geographyModal) geographyModal.classList.remove('hidden');
                else if (targetType === 'language' && languageModal) languageModal.classList.remove('hidden');
            });
        });

        const form = document.getElementById('create-campaign-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const newCampaign = {
                name: form.querySelector('#campaign-name').value,
                budget: parseFloat(form.querySelector('#planned-spend').value) || 0,
                spent: 0,
                kpiGoal: form.querySelector('#campaign-kpi-value').value || 'N/A',
                kpiActual: 0,
            };
            campaignListData.push(newCampaign);
            renderCampaignList(campaignListData);
            campaignModal.classList.add('hidden');
            alert(`New campaign "${newCampaign.name}" created!`);
            form.reset();
        });
    };

    const setupTargetingSubModals = () => {
        const modals = [demographicsModal, geographyModal, languageModal];
        modals.forEach(modal => {
            if (!modal) return;
            modal.querySelectorAll('.close-btn').forEach(btn => btn.addEventListener('click', () => modal.classList.add('hidden')));
            const applyBtn = modal.querySelector('[class*="apply-"]');
            if(applyBtn) {
                 applyBtn.addEventListener('click', () => {
                    alert('Targeting settings applied!');
                    modal.classList.add('hidden');
                });
            }
        });
    };
    
    const setupIoModal = () => {
        if (!newIoBtn || !ioModal) return;
        newIoBtn.addEventListener('click', () => ioModal.classList.remove('hidden'));
        ioModal.querySelectorAll('.close-btn, .form-navigation .secondary-btn').forEach(btn => {
            btn.addEventListener('click', () => ioModal.classList.add('hidden'));
        });

        const form = ioModal.querySelector('#create-io-form');

        const addSegmentBtn = form.querySelector('#add-io-segment-btn');
        const segmentsTbody = form.querySelector('#io-budget-segments-tbody');
        if(addSegmentBtn && segmentsTbody) {
            addSegmentBtn.addEventListener('click', () => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><input type="number"></td>
                    <td><input type="text"></td>
                    <td><input type="date"></td>
                    <td><input type="date"></td>
                    <td><button type="button" class="icon-btn delete-segment-btn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg></button></td>
                `;
                segmentsTbody.appendChild(row);
            });
            segmentsTbody.addEventListener('click', (e) => {
                if (e.target.closest('.delete-segment-btn')) {
                    e.target.closest('tr').remove();
                }
            });
        }
        
        const freqCapRadios = form.querySelectorAll('input[name="io-frequency-cap"]');
        const freqCapSettings = form.querySelector('.io-freq-cap-settings');
        if (freqCapRadios && freqCapSettings) {
            freqCapRadios.forEach(radio => radio.addEventListener('change', e => freqCapSettings.classList.toggle('hidden', e.target.value !== 'limit-exposure')));
        }
        
        const optimizationRadios = form.querySelectorAll('input[name="io-optimization"]');
        const optimizationSubOptions = form.querySelector('.optimization-sub-options');
        if(optimizationRadios && optimizationSubOptions) {
            optimizationRadios.forEach(radio => radio.addEventListener('change', (e) => {
                const subRadios = optimizationSubOptions.querySelectorAll('input');
                if (e.target.value === 'auto-io-level') {
                    subRadios.forEach(r => r.disabled = false);
                } else {
                    subRadios.forEach(r => r.disabled = true);
                }
            }));
        }

        const editTargetingBtns = form.querySelectorAll('.edit-targeting-btn');
        const additionalTargetingSelect = form.querySelector('#additional-targeting');
        const openTargetingModal = (target) => {
            const modal = ioTargetingModals[target];
            if(modal) modal.classList.remove('hidden');
        };
        editTargetingBtns.forEach(btn => btn.addEventListener('click', e => openTargetingModal(e.currentTarget.dataset.target)));
        if (additionalTargetingSelect) {
            additionalTargetingSelect.addEventListener('change', (e) => {
                if (e.target.value) {
                    openTargetingModal(e.target.value);
                    e.target.value = "";
                }
            });
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let totalBudget = 0;
            segmentsTbody.querySelectorAll('tr').forEach(row => {
                const budgetInput = row.querySelector('input[type="number"]');
                if (budgetInput && budgetInput.value) {
                    totalBudget += parseFloat(budgetInput.value);
                }
            });

            const newIO = {
                name: form.querySelector('#io-name').value,
                campaign: campaignListData[0]?.name || "Unassigned",
                status: "Active",
                budget: totalBudget,
                spent: 0
            };
            insertionOrderData.push(newIO);
            renderInsertionOrderTable(insertionOrderData);
            ioModal.classList.add('hidden');
            alert(`New Insertion Order "${newIO.name}" created!`);
        });
    };

    const setupIoTargetingSubModals = () => {
        for (const key in ioTargetingModals) {
            const modal = ioTargetingModals[key];
            if (modal) {
                modal.querySelectorAll('.close-btn, [class*="apply-"]').forEach(btn => {
                    btn.addEventListener('click', () => {
                        if (btn.classList.contains('create-btn')) {
                            alert('Targeting settings applied!');
                        }
                        modal.classList.add('hidden');
                    });
                });
            }
        }
    };

    const setupLiModal = () => {
        if (!newLineItemBtn || !liModal) return;

        const form = liModal.querySelector('#create-li-form');
        newLineItemBtn.addEventListener('click', () => liModal.classList.remove('hidden'));
        liModal.querySelectorAll('.close-btn, .form-navigation .secondary-btn').forEach(btn => {
            btn.addEventListener('click', () => liModal.classList.add('hidden'));
        });

        // Toggle visibility of custom settings
        const flightRadios = form.querySelectorAll('input[name="li-flight-dates"]');
        const customDatesDiv = form.querySelector('.li-custom-dates');
        flightRadios.forEach(radio => radio.addEventListener('change', e => customDatesDiv.classList.toggle('hidden', e.target.value !== 'custom')));

        const budgetRadios = form.querySelectorAll('input[name="li-budget"]');
        const budgetSettingsDiv = form.querySelector('.li-budget-settings');
        budgetRadios.forEach(radio => radio.addEventListener('change', e => budgetSettingsDiv.classList.toggle('hidden', e.target.value !== 'li')));
        
        const freqCapCheckbox = form.querySelector('#li-override-freq-cap');
        const freqCapSettings = form.querySelector('.li-freq-cap-settings');
        if(freqCapCheckbox) freqCapCheckbox.addEventListener('change', e => freqCapSettings.classList.toggle('hidden', !e.target.checked));

        // Dynamic Targeting
        const targetingGroup = form.querySelector('#li-targeting-group');
        const addTargetingSelect = form.querySelector('#li-additional-targeting');
        const targetingRowTemplates = {
            'audience-lists': { label: 'Audience lists', value: '0 lists' },
            'day-time': { label: 'Day & time', value: 'All days and hours' },
            'demographics': { label: 'Demographics', value: 'All' },
            'technology': { label: 'Technology', value: 'All' },
            'geography': { label: 'Geography', value: 'All' },
            'language': { label: 'Language', value: 'All' },
            'keywords': { label: 'Keywords', value: 'Not set' },
            'categories-genres': { label: 'Categories & genres', value: 'All' },
            'apps-urls': { label: 'Apps & URLs', value: 'Not set' },
            'position': { label: 'Position', value: 'All' },
        };

        const addLiTargetingRow = (type) => {
            if (!targetingRowTemplates[type]) return;
            const template = targetingRowTemplates[type];
            const row = document.createElement('div');
            row.className = 'targeting-row';
            row.dataset.targetingType = type;
            row.innerHTML = `
                <span class="targeting-label">${template.label}</span>
                <span class="targeting-value">${template.value}</span>
                <button type="button" class="icon-btn edit-li-targeting-btn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg></button>
            `;
            targetingGroup.appendChild(row);
        };

        addTargetingSelect.addEventListener('change', (e) => {
            const type = e.target.value;
            if (!type) return;
            addLiTargetingRow(type);
            e.target.querySelector(`option[value="${type}"]`).disabled = true;
            e.target.value = '';
        });

        targetingGroup.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.edit-li-targeting-btn');
            if (editBtn) {
                const row = editBtn.closest('.targeting-row');
                const type = row.dataset.targetingType;
                const modalToOpen = liTargetingModals[type];
                if (modalToOpen) {
                    modalToOpen.classList.remove('hidden');
                } else {
                    alert(`Targeting for "${type}" is not yet implemented.`);
                }
            }
        });

        // Form Submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const newLI = {
                name: form.querySelector('#li-name').value,
                insertionOrder: insertionOrderData[0]?.name || 'Unassigned',
                type: 'Display', 
                status: 'Active'
            };
            lineItemData.push(newLI);
            renderLineItemTable(lineItemData);
            liModal.classList.add('hidden');
            alert(`New Line Item "${newLI.name}" created!`);
        });
    };

    const setupLiTargetingSubModals = () => {
        for (const key in liTargetingModals) {
            const modal = liTargetingModals[key];
            if (modal) {
                modal.querySelectorAll('.close-btn, [class*="apply-"]').forEach(btn => {
                    btn.addEventListener('click', () => {
                        if (btn.classList.contains('create-btn')) {
                            alert('Targeting settings applied!');
                        }
                        modal.classList.add('hidden');
                    });
                });
            }
        }
    };
    
    setupModal(newUserBtn, userModal, (close) => { alert('New user added!'); close(); });
    setupModal(requestProposalBtn, rfpModal, (close) => { alert('RFP Sent!'); close(); });
    setupModal(compareBtn, compareModal, () => {});
    setupModal(assignToLiBtn, assignDealModal, (close) => { alert('Deal Assigned to New Line Item!'); if(packageDetailsModal) packageDetailsModal.classList.add('hidden'); close(); });
    setupModal(newInstantDealBtn, instantDealModal, (close) => { alert('Forecast Requested! Your deal is now in Negotiations.'); if(exchangeDetailsModal) exchangeDetailsModal.classList.add('hidden'); close(); });
    setupModal(newOfflineReportBtn, reportBuilderModal, (close) => { const form = reportBuilderModal.querySelector('#create-report-form'); const reportName = form.querySelector('#report-name').value; const dateRange = form.querySelector('#date-range').value; const newReport = { name: reportName, type: 'Standard', dateRange: dateRange, lastRun: new Date().toLocaleDateString('en-CA') }; offlineReportsData.push(newReport); renderOfflineReportsTable(offlineReportsData); alert(`Report "${reportName}" was saved and is running.`); close(); });
    
    const setupAudienceBuilder = () => { if (!newAudienceBtn || !audienceBuilderModal || !activityAudienceModal) return; newAudienceBtn.addEventListener('click', () => { audienceBuilderModal.classList.remove('hidden'); }); audienceBuilderModal.querySelector('.close-btn').addEventListener('click', () => { audienceBuilderModal.classList.add('hidden'); }); const createActivityBtn = audienceBuilderModal.querySelector('#create-activity-based-btn'); if (createActivityBtn) { createActivityBtn.addEventListener('click', () => { audienceBuilderModal.classList.add('hidden'); activityAudienceModal.classList.remove('hidden'); }); } const activityForm = activityAudienceModal.querySelector('#create-activity-audience-form'); if (activityForm) { activityAudienceModal.querySelector('.close-btn').addEventListener('click', () => { activityAudienceModal.classList.add('hidden'); }); activityForm.addEventListener('submit', (e) => { e.preventDefault(); const newAudienceName = activityForm.querySelector('#activity-audience-name').value; const newAudience = { name: newAudienceName, type: "Activity-based", source: "Display & Video 360", size: { display: 800, youtube: 0, mobile: 500 } }; audienceListData.push(newAudience); renderAudienceTable(audienceListData); activityAudienceModal.classList.add('hidden'); activityForm.reset(); alert(`New audience "${newAudienceName}" has been created!`); }); } };
    const setupCombinedAudienceBuilder = () => { if (!audienceBuilderModal || !combinedAudienceModal || !audiencePickerModal) return; const createCombinedBtn = audienceBuilderModal.querySelector('#create-combined-btn'); let selectedForCombination = []; createCombinedBtn.addEventListener('click', () => { audienceBuilderModal.classList.add('hidden'); combinedAudienceModal.classList.remove('hidden'); }); const addAudienceBtn = combinedAudienceModal.querySelector('#add-include-audience-btn'); addAudienceBtn.addEventListener('click', () => { const pickerList = audiencePickerModal.querySelector('#picker-audience-list'); pickerList.innerHTML = audienceListData.map(audience => `<span class="audience-picker-item"><label><input type="checkbox" value="${audience.name}"> ${audience.name}</label></span>`).join(''); audiencePickerModal.classList.remove('hidden'); }); const applyBtn = audiencePickerModal.querySelector('#apply-audience-selection-btn'); applyBtn.addEventListener('click', () => { const checkedBoxes = audiencePickerModal.querySelectorAll('input[type="checkbox"]:checked'); selectedForCombination = Array.from(checkedBoxes).map(cb => cb.value); const includedContainer = combinedAudienceModal.querySelector('#included-audiences-container'); includedContainer.innerHTML = selectedForCombination.map(name => `<div class="included-audience-card"><span>${name}</span><button type="button" class="close-btn">&times;</button></div>`).join(''); audiencePickerModal.classList.add('hidden'); }); const combinedForm = combinedAudienceModal.querySelector('#create-combined-form'); combinedForm.addEventListener('submit', (e) => { e.preventDefault(); const newName = combinedForm.querySelector('#combined-audience-name').value; const newAudience = { name: newName, type: 'Combined', source: 'Advertiser' }; combinedAudienceData.push(newAudience); renderCombinedAudienceTable(combinedAudienceData); combinedAudienceModal.classList.add('hidden'); combinedForm.reset(); combinedAudienceModal.querySelector('#included-audiences-container').innerHTML = ''; alert(`New combined audience "${newName}" was saved!`); }); combinedAudienceModal.querySelector('.close-btn').addEventListener('click', () => combinedAudienceModal.classList.add('hidden')); audiencePickerModal.querySelector('.close-btn').addEventListener('click', () => audiencePickerModal.classList.add('hidden')); };

    if (adCanvasModal) { const openAdCanvas = (creativeId) => { const creative = creativeListData.find(c => c.id === creativeId); if (!creative) return; adCanvasModal.querySelector('#ad-canvas-title').textContent = `Ad Canvas: ${creative.name}`; adCanvasModal.querySelector('#ad-canvas-image').src = creative.imageUrl; const defaultDevice = adCanvasModal.querySelector('[data-size="300x250"]'); if (defaultDevice) defaultDevice.click(); adCanvasModal.classList.remove('hidden'); }; adCanvasModal.querySelector('.close-btn').addEventListener('click', () => adCanvasModal.classList.add('hidden')); if (creativeListContainer) { creativeListContainer.addEventListener('click', (e) => { if (e.target.classList.contains('preview-btn')) { openAdCanvas(parseInt(e.target.dataset.creativeId, 10)); } }); } if (formatGalleryContainer) { formatGalleryContainer.addEventListener('click', (e) => { if (e.target.classList.contains('format-create-btn')) { openAdCanvas(parseInt(e.target.dataset.creativeId, 10)); } }); } const adCanvasPreviewArea = adCanvasModal.querySelector('.ad-canvas-preview-area'); const deviceSwitcher = adCanvasModal.querySelector('.device-switcher'); if (deviceSwitcher) { deviceSwitcher.addEventListener('click', (e) => { if (e.target.classList.contains('device-btn')) { const [w, h] = e.target.dataset.size.split('x'); adCanvasPreviewArea.style.aspectRatio = `${w} / ${h}`; deviceSwitcher.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active-device')); e.target.classList.add('active-device'); } }); }}
    
    if (intelligencePanel) { openIntelligencePanelBtn.addEventListener('click', () => intelligencePanel.classList.add('open')); document.getElementById('close-intelligence-panel-btn').addEventListener('click', () => intelligencePanel.classList.remove('open')); const panelContent = document.getElementById('intelligence-panel-content'); if (panelContent) { panelContent.addEventListener('click', (e) => { if (e.target.classList.contains('action-btn') && e.target.textContent === 'Troubleshoot') { if (troubleshootModal) troubleshootModal.classList.remove('hidden'); } }); } }
    if (troubleshootModal) { troubleshootModal.querySelector('.close-btn').addEventListener('click', () => troubleshootModal.classList.add('hidden')); }
    if (campaignGoalSelect) { campaignGoalSelect.addEventListener('change', updateKpiOptions); }
    if (marketplaceTableContainer) { const updateSelectionBar = () => { const selectedCheckboxes = marketplaceTableContainer.querySelectorAll('.publisher-checkbox:checked'); const count = selectedCheckboxes.length; const actionBar = document.getElementById('selection-action-bar'); if(actionBar) { if (count > 0) { actionBar.classList.remove('hidden'); actionBar.querySelector('#selection-count').textContent = `${count} row${count > 1 ? 's' : ''} selected`; requestProposalBtn.disabled = false; compareBtn.disabled = count > 3 || count < 2; } else { actionBar.classList.add('hidden'); } } }; marketplaceTableContainer.addEventListener('change', (e) => { const target = e.target; if (target.id === 'select-all-publishers') { marketplaceTableContainer.querySelectorAll('.publisher-checkbox').forEach(cb => { cb.checked = target.checked; cb.closest('tr').classList.toggle('selected-row', target.checked); }); } else if (target.classList.contains('publisher-checkbox')) { target.closest('tr').classList.toggle('selected-row', target.checked); } updateSelectionBar(); }); }
    if(rfpModal) { requestProposalBtn.addEventListener('click', () => { const selectedCards = marketplaceTableContainer.querySelectorAll('.selected-row'); const publisherList = rfpModal.querySelector('#rfp-publisher-list'); if(publisherList) { publisherList.innerHTML = ''; selectedCards.forEach(card => { const publisherName = marketplacePublisherData.find(p => p.id === parseInt(card.dataset.id)).name; const li = document.createElement('li'); li.innerHTML = `<span>${publisherName}</span><button type="button" class="close-btn" style="font-size: 1.2rem;">&times;</button>`; publisherList.appendChild(li); }); } }); }
    if(compareModal) { compareBtn.addEventListener('click', () => { const selectedIds = Array.from(marketplaceTableContainer.querySelectorAll('.selected-row')).map(row => parseInt(row.dataset.id)); renderCompareModal(selectedIds); }); }
    if(packageDetailsModal) { const container = document.getElementById('inventory-packages-container'); if(container){ container.addEventListener('click', (e) => { if (e.target.classList.contains('package-link')) { e.preventDefault(); packageDetailsModal.classList.remove('hidden'); } }); } packageDetailsModal.querySelector('.close-btn').addEventListener('click', () => packageDetailsModal.classList.add('hidden')); }
    if (featuredPublishersContainer) { featuredPublishersContainer.addEventListener('click', (e) => { const card = e.target.closest('.featured-card'); if (card && card.dataset.instant === 'true') { if (exchangeDetailsModal) exchangeDetailsModal.classList.remove('hidden'); } }); }
    if (exchangeDetailsModal) { exchangeDetailsModal.querySelector('.close-btn').addEventListener('click', () => exchangeDetailsModal.classList.add('hidden'));}
    if (headerInsightsBtn) { headerInsightsBtn.addEventListener('click', () => { navLinks.forEach(l => { if (l.textContent.toLowerCase().includes('insights')) { l.querySelector('a').click(); } }); }); }
    
    // ===== INITIALIZATION =====
    showView('campaign-view');
    renderCampaignList(campaignListData);
    renderInsertionOrderTable(insertionOrderData);
    renderLineItemTable(lineItemData);
    renderAudienceTable(audienceListData);
    renderCombinedAudienceTable(combinedAudienceData);
    renderCreativeTable(creativeListData); 
    renderTeamMembers(teamMemberData);
    renderFormatGallery(formatGalleryData);
    renderIntelligencePanel(intelligenceAlertsData);
    updateKpiOptions();
    renderMyInventoryTable(myInventoryData);
    renderMarketplaceTable(marketplacePublisherData);
    renderNegotiationsTable(negotiationsData);
    renderInventoryPackages(inventoryPackagesData);
    renderFeaturedPublishers(featuredPublishersData);
    renderOfflineReportsTable(offlineReportsData);
    setupCampaignModal();
    setupIoModal();
    setupLiModal();
    setupTargetingSubModals();
    setupIoTargetingSubModals();
    setupLiTargetingSubModals();
    setupAudienceBuilder();
    setupCombinedAudienceBuilder();
});
