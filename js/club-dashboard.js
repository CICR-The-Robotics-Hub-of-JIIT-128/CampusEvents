// Club Dashboard JavaScript

let currentClubId = null;
let currentClub = null;
let selectedFiles = [];

// Initialize dashboard when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

// Initialize the dashboard
function initializeDashboard() {
    // Check if user is logged in and is a club
    if (!Auth.protectPage('club')) {
        return;
    }

    // Get club ID from URL or session
    const urlParams = new URLSearchParams(window.location.search);
    const clubId = urlParams.get('club');
    const session = Auth.getCurrentSession();

    if (!clubId && session) {
        currentClubId = session.clubId;
    } else {
        currentClubId = clubId;
    }

    // Verify user owns this club
    if (session && session.clubId !== currentClubId) {
        CollegeClubApp.showAlert('Access denied to this club dashboard', 'error');
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 2000);
        return;
    }

    // Load club data
    loadClubData();
    
    // Set up drag and drop for file upload
    setupFileUpload();
    
    // Show overview section by default
    showSection('overview');
}

// Load club data and populate dashboard
function loadClubData() {
    currentClub = ClubManager.getClubById(currentClubId);
    
    if (!currentClub) {
        CollegeClubApp.showAlert('Club not found', 'error');
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 2000);
        return;
    }

    // Update UI with club data
    document.getElementById('clubName').textContent = currentClub.name;
    document.title = `${currentClub.name} Dashboard - College Clubs Hub`;
    
    // Update overview stats
    updateOverviewStats();
    
    // Load profile form data
    loadProfileForm();
    
    // Load media gallery
    loadMediaGallery();
    
    // Load recent activity
    loadRecentActivity();
    
    // Update settings info
    updateSettingsInfo();
}

// Update overview statistics
function updateOverviewStats() {
    document.getElementById('totalMembers').textContent = currentClub.members || 0;
    document.getElementById('totalMedia').textContent = currentClub.media ? currentClub.media.length : 0;
    
    // Count pending media
    const pendingCount = currentClub.media ? 
        currentClub.media.filter(media => media.status === 'pending').length : 0;
    document.getElementById('pendingMedia').textContent = pendingCount;
    
    // Mock profile views (in real app, this would come from analytics)
    const views = CollegeClubApp.getLocalStorage(`club_views_${currentClubId}`) || Math.floor(Math.random() * 1000);
    document.getElementById('profileViews').textContent = views;
}

// Load profile form with current data
function loadProfileForm() {
    document.getElementById('clubNameEdit').value = currentClub.name || '';
    document.getElementById('clubDescription').value = currentClub.description || '';
    document.getElementById('clubCategory').value = currentClub.category || '';
    document.getElementById('clubMembers').value = currentClub.members || '';
    document.getElementById('clubEmail').value = currentClub.contact?.email || '';
    document.getElementById('meetingTime').value = currentClub.contact?.meetingTime || '';
    document.getElementById('meetingLocation').value = currentClub.contact?.location || '';
}

// Load media gallery
function loadMediaGallery() {
    const gallery = document.getElementById('mediaGallery');
    
    if (!currentClub.media || currentClub.media.length === 0) {
        gallery.innerHTML = '<p>No media uploaded yet. <a href="#upload" onclick="showSection(\'upload\')">Upload your first photo or video!</a></p>';
        return;
    }

    gallery.innerHTML = currentClub.media.map(media => {
        // Handle different URL formats (absolute vs relative)
        const mediaUrl = media.url.startsWith('http') || media.url.startsWith('data:') 
            ? media.url 
            : `../${media.url}`;
        
        return `
        <div class="media-item">
            ${media.type === 'image' 
                ? `<img src="${mediaUrl}" alt="${media.caption || 'Club media'}" onerror="this.src='../images/placeholder.jpg'" />` 
                : `<video src="${mediaUrl}" controls><p>Video not available</p></video>`
            }
            <div class="media-overlay">
                <div class="media-actions">
                    <button onclick="viewMedia('${media.id}')" title="View">👁️</button>
                    <button onclick="editMedia('${media.id}')" title="Edit">✏️</button>
                    <button onclick="deleteMedia('${media.id}')" title="Delete">🗑️</button>
                </div>
            </div>
            ${media.status === 'pending' ? '<div class="status-badge status-pending">Pending</div>' : ''}
        </div>
        `;
    }).join('');
}

// Load recent activity
function loadRecentActivity() {
    const activityDiv = document.getElementById('recentActivity');
    
    // Mock activity data - in real app, this would come from backend
    const activities = [
        { date: new Date(Date.now() - 24 * 60 * 60 * 1000), action: 'Photo uploaded', detail: 'Club event photo added' },
        { date: new Date(Date.now() - 48 * 60 * 60 * 1000), action: 'Profile updated', detail: 'Meeting time changed' },
        { date: new Date(Date.now() - 72 * 60 * 60 * 1000), action: 'Media approved', detail: 'Video approved by admin' }
    ];

    activityDiv.innerHTML = activities.map(activity => `
        <div class="activity-item" style="padding: 0.5rem 0; border-bottom: 1px solid #eee;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>${activity.action}</strong>
                    <p style="margin: 0; color: #666; font-size: 0.9rem;">${activity.detail}</p>
                </div>
                <span style="color: #888; font-size: 0.8rem;">${activity.date.toLocaleDateString()}</span>
            </div>
        </div>
    `).join('');
}

// Update settings information
function updateSettingsInfo() {
    const session = Auth.getCurrentSession();
    document.getElementById('lastLogin').textContent = new Date(session.loginTime).toLocaleString();
    document.getElementById('accountCreated').textContent = currentClub.founded || 'Unknown';
    
    // Update club status
    const statusElement = document.getElementById('clubStatus');
    statusElement.textContent = currentClub.status || 'Active';
    statusElement.className = `status-badge status-${currentClub.status || 'active'}`;
}

// Show specific dashboard section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Remove active class from all nav links
    document.querySelectorAll('.sidebar-menu .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
    }
    
    // Add active class to clicked nav link
    const activeLink = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Handle profile update
function updateProfile(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const updates = {
        name: formData.get('name'),
        description: formData.get('description'),
        category: formData.get('category'),
        members: parseInt(formData.get('members')),
        contact: {
            email: formData.get('email'),
            meetingTime: formData.get('meetingTime'),
            location: formData.get('location')
        }
    };

    try {
        ClubManager.updateClub(currentClubId, updates);
        currentClub = { ...currentClub, ...updates };
        
        // Update UI
        document.getElementById('clubName').textContent = updates.name;
        updateOverviewStats();
        
        CollegeClubApp.showAlert('Profile updated successfully!', 'success');
    } catch (error) {
        CollegeClubApp.showAlert('Error updating profile: ' + error.message, 'error');
    }
}

// Set up file upload functionality
function setupFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    
    // Drag and drop handlers
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    });
}

// Handle file selection
function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    handleFiles(files);
}

// Handle selected files
function handleFiles(files) {
    selectedFiles = [];
    
    // Validate files
    const validFiles = files.filter(file => {
        // Check file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'video/mp4', 'video/mov'];
        if (!validTypes.includes(file.type)) {
            CollegeClubApp.showAlert(`Invalid file type: ${file.name}`, 'error');
            return false;
        }
        
        // Check file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            CollegeClubApp.showAlert(`File too large: ${file.name} (Max 10MB)`, 'error');
            return false;
        }
        
        return true;
    });
    
    selectedFiles = validFiles;
    displaySelectedFiles();
}

// Display selected files
function displaySelectedFiles() {
    const fileList = document.getElementById('fileList');
    const selectedFilesDiv = document.getElementById('selectedFiles');
    
    if (selectedFiles.length === 0) {
        fileList.style.display = 'none';
        return;
    }
    
    fileList.style.display = 'block';
    
    selectedFilesDiv.innerHTML = selectedFiles.map((file, index) => `
        <div class="file-item">
            <div class="file-info">
                <span class="file-name">${file.name}</span>
                <span class="file-size">${CollegeClubApp.formatFileSize(file.size)}</span>
            </div>
            <button class="file-remove" onclick="removeFile(${index})">Remove</button>
        </div>
    `).join('');
}

// Remove file from selection
function removeFile(index) {
    selectedFiles.splice(index, 1);
    displaySelectedFiles();
}

// Upload files (mock implementation)
function uploadFiles() {
    if (selectedFiles.length === 0) {
        CollegeClubApp.showAlert('No files selected', 'error');
        return;
    }
    
    const uploadButton = document.getElementById('uploadButton');
    uploadButton.innerHTML = '<span class="loading-spinner"></span> Uploading...';
    uploadButton.disabled = true;
    
    // Simulate upload process
    setTimeout(() => {
        selectedFiles.forEach(file => {
            const mediaData = {
                type: file.type.startsWith('image/') ? 'image' : 'video',
                url: `uploads/${currentClubId}/${file.name}`, // Mock URL
                caption: file.name.split('.')[0],
                fileName: file.name,
                size: file.size,
                uploadDate: new Date().toISOString(),
                status: 'pending'
            };
            
            try {
                ClubManager.addMediaToClub(currentClubId, mediaData);
            } catch (error) {
                console.error('Error adding media:', error);
            }
        });
        
        // Refresh club data and UI
        currentClub = ClubManager.getClubById(currentClubId);
        loadMediaGallery();
        updateOverviewStats();
        
        // Reset upload form
        selectedFiles = [];
        document.getElementById('fileList').style.display = 'none';
        document.getElementById('fileInput').value = '';
        
        // Reset button
        uploadButton.innerHTML = 'Upload Files';
        uploadButton.disabled = false;
        
        CollegeClubApp.showAlert('Files uploaded successfully! Pending admin approval.', 'success');
    }, 2000);
}

// View media item
function viewMedia(mediaId) {
    const media = currentClub.media.find(m => m.id === mediaId);
    if (!media) return;
    
    // Open media in a modal (simplified version)
    alert(`Viewing: ${media.caption || 'Media item'}`);
}

// Edit media item
function editMedia(mediaId) {
    const media = currentClub.media.find(m => m.id === mediaId);
    if (!media) return;
    
    const newCaption = prompt('Enter new caption:', media.caption || '');
    if (newCaption !== null) {
        media.caption = newCaption;
        ClubManager.updateClub(currentClubId, { media: currentClub.media });
        loadMediaGallery();
        CollegeClubApp.showAlert('Media updated successfully!', 'success');
    }
}

// Delete media item
function deleteMedia(mediaId) {
    if (confirm('Are you sure you want to delete this media item?')) {
        try {
            ClubManager.removeMediaFromClub(currentClubId, mediaId);
            currentClub = ClubManager.getClubById(currentClubId);
            loadMediaGallery();
            updateOverviewStats();
            CollegeClubApp.showAlert('Media deleted successfully!', 'success');
        } catch (error) {
            CollegeClubApp.showAlert('Error deleting media: ' + error.message, 'error');
        }
    }
}

// Change password
function changePassword(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        CollegeClubApp.showAlert('New passwords do not match', 'error');
        return;
    }
    
    try {
        Auth.changeClubPassword(currentClubId, currentPassword, newPassword);
        CollegeClubApp.showAlert('Password changed successfully!', 'success');
        
        // Clear form
        document.getElementById('passwordForm').reset();
    } catch (error) {
        CollegeClubApp.showAlert(error.message, 'error');
    }
}

// Go to main site
function goToMainSite() {
    window.open('../index.html', '_blank');
}

// View public profile
function viewPublicProfile() {
    // Open main site and scroll to club
    window.open(`../index.html#club-${currentClubId}`, '_blank');
}

// Confirm account deletion
function confirmDeleteAccount() {
    document.getElementById('deleteModal').style.display = 'block';
}

// Close delete modal
function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
    document.getElementById('deleteConfirmation').value = '';
}

// Delete account
function deleteAccount() {
    const confirmation = document.getElementById('deleteConfirmation').value;
    
    if (confirmation !== 'DELETE') {
        CollegeClubApp.showAlert('Please type "DELETE" to confirm', 'error');
        return;
    }
    
    if (confirm('This will permanently delete your club account. Are you absolutely sure?')) {
        try {
            ClubManager.deleteClub(currentClubId);
            localStorage.removeItem('userSession');
            
            CollegeClubApp.showAlert('Club account deleted successfully', 'success');
            
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        } catch (error) {
            CollegeClubApp.showAlert('Error deleting account: ' + error.message, 'error');
        }
    }
}

// Add CSS for dashboard sections
const style = document.createElement('style');
style.textContent = `
    .dashboard-section {
        display: none;
    }
    
    .dashboard-section.active {
        display: block;
    }
    
    .club-name {
        font-weight: 600;
        color: #3498db;
    }
    
    .activity-item:last-child {
        border-bottom: none !important;
    }
    
    .status-info p {
        margin: 0.5rem 0;
    }
`;
document.head.appendChild(style);
