document.addEventListener('DOMContentLoaded', () => {
    // Redirect if no user data found in sessionStorage
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (!userData) {
        console.warn('No user data found in sessionStorage. Redirecting to login page.');
        window.location.href = '/login.html';
        return;
    }

    // Extract `org_id` from userData
    const userOrgId = userData.org_id;
    if (!userOrgId) {
        console.error('org_id not found in user data:', userData);
        return;
    }

    // Debug: Log user org_id
    console.log('User org_id:', userOrgId);

    // Function to update date and time
    function updateDateTime() {
        const dateElement = document.getElementById('current-date');
        const timeElement = document.getElementById('current-time');
        const timeIcon = document.getElementById('time-icon');

        if (!dateElement || !timeElement || !timeIcon) {
            console.error('Missing elements for date/time update');
            return;
        }

        const now = new Date();
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString(undefined, options);

        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;

        timeElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
        timeIcon.className = `text-2xl fa-solid ${ampm === 'AM' ? 'fa-sun' : 'fa-moon'}`;
        timeIcon.style.color = ampm === 'AM' ? '#FFAE21' : '#2563eb';
    }

    // Function to render events
    function renderEvents(events) {
        const eventListContainer = document.getElementById('admin-event');
        if (!eventListContainer) {
            console.error('Missing event list container');
            return;
        }

        // Filter events by org_id
        const filteredEvents = events.filter(event => event.org_id === userOrgId);
        console.log('Filtered events:', filteredEvents); // Debug: Log filtered events

        if (filteredEvents.length > 0) {
            const eventCards = filteredEvents.map(event => `
                <div class="bg-white p-4 shadow rounded-lg flex items-center">
                    <div class="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                        <span class="font-bold text-lg">${event.date || 'N/A'}</span>
                    </div>
                    <div class="ml-4">
                        <h3 class="font-bold text-lg">${event.event_title || 'Untitled Event'}</h3>
                        <p class="text-sm text-gray-600">${event.location || 'No Location'} | ${event.date_started || 'N/A'} – ${event.date_ended || 'N/A'}</p>
                        <p class="text-sm text-gray-600">Organized by: ${event.org_name || 'Unknown Organization'}</p>
                    </div>
                    <div class="ml-auto">
                        <button class="px-4 py-2 bg-[#E73030] text-white rounded-lg hover:bg-red-700 transition">
                            View Details
                        </button>
                    </div>
                </div>
            `).join('');
            eventListContainer.innerHTML = eventCards;
        } else {
            console.warn('No events found for org_id:', userOrgId);
            eventListContainer.innerHTML = '<p>No events found.</p>';
        }
    }

    // Fetch and render events
    fetch('/src/Server/api/read_event.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched event data:', data); // Debug: Log fetched data
            renderEvents(data.data || []);
        })
        .catch(error => console.error('Error fetching events:', error));

    // Toggle sub-links visibility
    const databaseLink = document.getElementById('database-link');
    const subLinks = document.getElementById('sub-links');
    if (databaseLink && subLinks) {
        databaseLink.addEventListener('click', () => {
            subLinks.classList.toggle('hidden');
        });
    }

    // Update date and time every second
    setInterval(updateDateTime, 1000);
    updateDateTime();
});
