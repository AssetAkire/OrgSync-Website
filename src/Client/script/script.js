// Fetch organization data from the server
fetch('/src/Server/api/read_org.php')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Check what data is being fetched
    if (data.data && data.data.length > 0) {
      const orgListContainer = document.getElementById('organization-list');
      orgListContainer.innerHTML = ''; // Clear the container before adding new data

      // Create organization cards dynamically
      const orgCards = data.data.map(org => {
        return `
          <div class="w-64 p-4 h-full bg-white rounded-3xl flex flex-col justify-between items-center space-y-4 shadow-md">
            <div class="flex flex-col space-y-4 w-full">
              <img src="/src/Client/img/${org.logo}" alt="${org.name}" 
                  class="w-full h-48 rounded-2xl bg-gray-200 object-cover">
              <h3 class="text-2xl font-semibold text-center">${org.name}</h3>
            </div>
            <button class="w-full p-4 bg-[#F0C9C9] rounded-xl hover:bg-[#ce5a5a] font-semibold" data-org-id="${org.id}">Learn More</button>
          </div>
        `;
      }).join(''); // Combine all the card HTML into a single string

      orgListContainer.innerHTML = orgCards; // Inject the cards into the container

      // Add click event listeners to the "Learn More" buttons
      document.querySelectorAll('button[data-org-id]').forEach(button => {
        button.addEventListener('click', function () {
          const orgId = this.getAttribute('data-org-id');
          const orgDetails = data.data.find(org => org.id == orgId);

          // Hide the organization list and show the detailed view
          document.getElementById('organization-list').classList.add('hidden');
          const orgDetailContent = document.getElementById('orgDetailContent');
          orgDetailContent.innerHTML = `
            <div class="rounded-2xl shadow-md h-96 flex items-start bg-cover bg-center" style="background-image: url('/src/Client/img/${orgDetails.logo}'); background-color: rgba(255, 255, 255, 0.1);">
                <div class="flex flex-col space-y-8 p-8 h-full justify-center w-full">
                    <div class="flex flex-col space-y-4">
                        <h1 class="text-5xl font-bold text-white">${orgDetails.name}</h1>
                        <div class="flex justify-between items-center space-x-4">
                            <button class="button bg-gradient-to-t from-[#F0C9C9] to-[#D9D9D9] text-black font-semibold text-lg p-5 px-7">Follow</button>
                            <div class="flex space-x-6 items-center justify-center">
                                <a href="${orgDetails.facebook}"><i class="fa-brands fa-facebook text-4xl text-white"></i></a>
                                <a href="${orgDetails.instagram}"><i class="fa-brands fa-instagram text-4xl text-white"></i></a>
                                <a href="${orgDetails.linkedin}"><i class="fa-brands fa-linkedin text-4xl text-white"></i></a>
                            </div>
                        </div>
                        <p class="text-md font-medium bg-[#FBF2F2] rounded-2xl p-6">${orgDetails.description}</p>
                    </div>
                </div>
            </div>
          `;

          // Show the detailed view
          document.getElementById('organization-detail').classList.remove('hidden');
        });
      });
    } else {
      document.getElementById('organization-list').innerHTML = '<p>No organizations found.</p>';
    }
  })
  .catch(error => {
    console.error('Error fetching organizations:', error);
    document.getElementById('organization-list').innerHTML = '<p>Error fetching organizations. Please try again later.</p>';
  });




// document.getElementById('login-btn').addEventListener('click', function() {
//     document.getElementById('login-container').classList.remove('hidden'); 

//     fetch('./scripts/login.html')
//         .then(response => response.text())
//         .then(html => {
//             document.getElementById('login-container').innerHTML = html;
//         })
//         .catch(error => console.error('Error loading the login page:', error));
// });


// document.getElementById('login-container').addEventListener('click', function(e) {
//     if (e.target === this) { 
//         document.getElementById('login-container').classList.add('hidden'); 
//     }
// });






