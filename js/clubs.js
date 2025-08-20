// Club data management and display

// Sample club data - In real app, this would come from backend API
const SAMPLE_CLUBS = [
    {
        id: 'tech-club',
        name: 'Technology Club',
        description: 'Explore the latest in technology, programming, and innovation. Join us for hackathons, coding competitions, and tech talks.',
        category: 'Technology',
        members: 150,
        founded: '2020',
        logo: '💻',
        contact: {
            email: 'tech@college.edu',
            meetingTime: 'Fridays 4:00 PM',
            location: 'Computer Lab A'
        },
        media: [
            {
                id: 'tech-1',
                type: 'image',
                url: 'https://picsum.photos/800/500?random=1',
                caption: 'Annual Hackathon 2024',
                uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'tech-2',
                type: 'image',
                url: 'https://picsum.photos/800/500?random=2',
                caption: 'AI Workshop Success',
                uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
            }
        ],
        status: 'active'
    },
    {
        id: 'drama-club',
        name: 'Drama Society',
        description: 'Express yourself through theater and performing arts. From Shakespeare to modern plays, we bring stories to life.',
        category: 'Arts',
        members: 85,
        founded: '2018',
        logo: '🎭',
        contact: {
            email: 'drama@college.edu',
            meetingTime: 'Tuesdays 6:00 PM',
            location: 'Auditorium'
        },
        media: [
            {
                id: 'drama-1',
                type: 'image',
                url: 'https://picsum.photos/800/500?random=3',
                caption: 'Hamlet Performance Night',
                uploadDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'drama-2',
                type: 'image',
                url: 'https://picsum.photos/800/500?random=4',
                caption: 'Behind the Scenes Rehearsal',
                uploadDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
            }
        ],
        status: 'active'
    },
    {
        id: 'sports-club',
        name: 'Sports Club',
        description: 'Stay fit and competitive with various sports activities. Basketball, soccer, cricket, and more!',
        category: 'Sports',
        members: 200,
        founded: '2015',
        logo: '⚽',
        contact: {
            email: 'sports@college.edu',
            meetingTime: 'Daily 5:00 PM',
            location: 'Sports Ground'
        },
        media: [
            {
                id: 'sports-1',
                type: 'image',
                url: 'https://picsum.photos/800/500?random=5',
                caption: 'Inter-college Tournament Victory',
                uploadDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'sports-2',
                type: 'image',
                url: 'https://picsum.photos/800/500?random=6',
                caption: 'Morning Training Session',
                uploadDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
            }
        ],
        status: 'active'
    },
    {
        id: 'music-club',
        name: 'Music Society',
        description: 'Create beautiful melodies and harmonies. Whether you sing, play instruments, or produce music, join us!',
        category: 'Arts',
        members: 75,
        founded: '2019',
        logo: '🎵',
        contact: {
            email: 'music@college.edu',
            meetingTime: 'Thursdays 5:00 PM',
            location: 'Music Room'
        },
        media: [
            {
                id: 'music-1',
                type: 'image',
                url: 'images/music-club-1.jpg',
                caption: 'Annual Concert'
            },
            {
                id: 'music-2',
                type: 'video',
                url: 'videos/music-club-performance.mp4',
                caption: 'Live Performance'
            }
        ],
        status: 'active'
    },
    {
        id: 'debate-club',
        name: 'Debate Club',
        description: 'Sharpen your argumentation skills and explore current affairs through structured debates and discussions.',
        category: 'Academic',
        members: 60,
        founded: '2017',
        logo: '💬',
        contact: {
            email: 'debate@college.edu',
            meetingTime: 'Wednesdays 4:00 PM',
            location: 'Seminar Hall'
        },
        media: [
            {
                id: 'debate-1',
                type: 'image',
                url: 'images/debate-club-1.jpg',
                caption: 'National Debate Competition'
            }
        ],
        status: 'active'
    },
    {
        id: 'photography-club',
        name: 'Photography Club',
        description: 'Capture moments and tell stories through the lens. Learn techniques, share your work, and go on photo walks.',
        category: 'Arts',
        members: 90,
        founded: '2021',
        logo: '📸',
        contact: {
            email: 'photo@college.edu',
            meetingTime: 'Saturdays 2:00 PM',
            location: 'Art Studio'
        },
        media: [
            {
                id: 'photo-1',
                type: 'image',
                url: 'images/photography-club-1.jpg',
                caption: 'Campus Photography Exhibition'
            },
            {
                id: 'photo-2',
                type: 'image',
                url: 'images/photography-club-2.jpg',
                caption: 'Nature Photography Workshop'
            }
        ],
        status: 'active'
    }
];

// Load clubs data
function loadClubs() {
    // In a real app, this would be an API call
    // For now, we'll use local storage with sample data
    
    let clubs = getLocalStorage('clubs');
    if (!clubs) {
        // Initialize with sample data
        clubs = SAMPLE_CLUBS;
        setLocalStorage('clubs', clubs);
    }
    
    displayClubs(clubs);
    return clubs;
}

// Display clubs on the main page
function displayClubs(clubs) {
    const clubsGrid = document.getElementById('clubsGrid');
    if (!clubsGrid) return;
    
    if (clubs.length === 0) {
        clubsGrid.innerHTML = '<p class="no-clubs">No clubs found.</p>';
        return;
    }
    
    clubsGrid.innerHTML = clubs.map(club => createClubCard(club)).join('');
}

// Create club card HTML
function createClubCard(club) {
    return `
        <div class="club-card" onclick="openClubDetailModal('${club.id}')">
            <div class="club-card-image">
                ${club.logo}
            </div>
            <div class="club-card-content">
                <h3>${club.name}</h3>
                <p>${club.description.substring(0, 120)}${club.description.length > 120 ? '...' : ''}</p>
                <div class="club-stats">
                    <span>${club.members} members</span>
                    <span>${club.category}</span>
                </div>
            </div>
        </div>
    `;
}

// Get club by ID
function getClubById(clubId) {
    const clubs = getLocalStorage('clubs') || SAMPLE_CLUBS;
    return clubs.find(club => club.id === clubId);
}

// Get all clubs
function getAllClubs() {
    return getLocalStorage('clubs') || SAMPLE_CLUBS;
}

// Add new club (for admin use)
function addClub(clubData) {
    const clubs = getAllClubs();
    const newClub = {
        id: generateId(),
        ...clubData,
        media: [],
        status: 'pending' // New clubs need admin approval
    };
    
    clubs.push(newClub);
    setLocalStorage('clubs', clubs);
    
    return newClub;
}

// Update club data
function updateClub(clubId, updates) {
    const clubs = getAllClubs();
    const clubIndex = clubs.findIndex(club => club.id === clubId);
    
    if (clubIndex === -1) {
        throw new Error('Club not found');
    }
    
    clubs[clubIndex] = { ...clubs[clubIndex], ...updates };
    setLocalStorage('clubs', clubs);
    
    return clubs[clubIndex];
}

// Delete club
function deleteClub(clubId) {
    const clubs = getAllClubs();
    const filteredClubs = clubs.filter(club => club.id !== clubId);
    
    setLocalStorage('clubs', filteredClubs);
    
    // Refresh display if we're on the main page
    const clubsGrid = document.getElementById('clubsGrid');
    if (clubsGrid) {
        displayClubs(filteredClubs);
    }
    
    return true;
}

// Filter clubs by category
function filterClubsByCategory(category) {
    const clubs = getAllClubs();
    if (category === 'all') {
        return clubs;
    }
    return clubs.filter(club => club.category.toLowerCase() === category.toLowerCase());
}

// Search clubs
function searchClubs(searchTerm) {
    const clubs = getAllClubs();
    const term = searchTerm.toLowerCase();
    
    return clubs.filter(club => 
        club.name.toLowerCase().includes(term) ||
        club.description.toLowerCase().includes(term) ||
        club.category.toLowerCase().includes(term)
    );
}

// Add media to club
function addMediaToClub(clubId, mediaData) {
    const club = getClubById(clubId);
    if (!club) {
        throw new Error('Club not found');
    }
    
    const newMedia = {
        id: generateId(),
        ...mediaData,
        uploadDate: new Date().toISOString(),
        status: 'pending' // Media needs admin approval
    };
    
    club.media.push(newMedia);
    updateClub(clubId, { media: club.media });
    
    return newMedia;
}

// Remove media from club
function removeMediaFromClub(clubId, mediaId) {
    const club = getClubById(clubId);
    if (!club) {
        throw new Error('Club not found');
    }
    
    club.media = club.media.filter(media => media.id !== mediaId);
    updateClub(clubId, { media: club.media });
    
    return true;
}

// Get clubs by status (for admin)
function getClubsByStatus(status) {
    const clubs = getAllClubs();
    return clubs.filter(club => club.status === status);
}

// Approve club
function approveClub(clubId) {
    return updateClub(clubId, { status: 'active' });
}

// Reject club
function rejectClub(clubId, reason = '') {
    return updateClub(clubId, { 
        status: 'rejected',
        rejectionReason: reason 
    });
}

// Get club statistics
function getClubStats() {
    const clubs = getAllClubs();
    
    const stats = {
        total: clubs.length,
        active: clubs.filter(club => club.status === 'active').length,
        pending: clubs.filter(club => club.status === 'pending').length,
        rejected: clubs.filter(club => club.status === 'rejected').length,
        totalMembers: clubs.reduce((sum, club) => sum + club.members, 0),
        categories: {}
    };
    
    // Count clubs by category
    clubs.forEach(club => {
        stats.categories[club.category] = (stats.categories[club.category] || 0) + 1;
    });
    
    return stats;
}

// Export functions
window.ClubManager = {
    loadClubs,
    displayClubs,
    getClubById,
    getAllClubs,
    addClub,
    updateClub,
    deleteClub,
    filterClubsByCategory,
    searchClubs,
    addMediaToClub,
    removeMediaFromClub,
    getClubsByStatus,
    approveClub,
    rejectClub,
    getClubStats
};
