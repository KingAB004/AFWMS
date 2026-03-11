// ===== User Management (Firebase Integrated Compat) =====

let users = [];
let filteredUsers = [];
window.users = users;

// Init Users Management
window.initUsersManagement = async function() {
    attachUserEventListeners();
    await fetchUsers();
};

async function fetchUsers() {
    const db = window.db;
    try {
        const usersRef = db.ref('users');
        const snapshot = await usersRef.once('value');
        users = [];
        if (snapshot.exists()) {
            const data = snapshot.val();
            for (let uid in data) {
                users.push({ id: uid, ...data[uid] });
            }
        }
        window.users = users;
        filteredUsers = [...users];
        renderUsersTable();
        if (typeof window.updateStats === 'function') {
            window.updateStats();
        }
    } catch (e) {
        console.error("Error fetching users: ", e);
    }
}

// Attach event listeners
function attachUserEventListeners() {
    const addUserBtn = document.getElementById('add-user-btn');
    const userForm = document.getElementById('user-form');
    const closeUserModalBtn = document.getElementById('close-user-modal');
    const closeFormBtn = document.getElementById('close-form-btn');
    const searchUsers = document.getElementById('search-users');
    const roleFilter = document.getElementById('role-filter');
    const statusFilter = document.getElementById('status-filter');

    if (addUserBtn) addUserBtn.addEventListener('click', openAddUserModal);
    if (userForm) userForm.addEventListener('submit', handleUserFormSubmit);
    if (closeUserModalBtn) closeUserModalBtn.addEventListener('click', closeUserModal);
    if (closeFormBtn) closeFormBtn.addEventListener('click', closeUserModal);
    if (searchUsers) searchUsers.addEventListener('input', filterUsers);
    if (roleFilter) roleFilter.addEventListener('change', filterUsers);
    if (statusFilter) statusFilter.addEventListener('change', filterUsers);
}

// Open Add User Modal
function openAddUserModal() {
    document.getElementById('user-id').value = '';
    document.getElementById('user-form').reset();
    document.getElementById('password').closest('.form-group').style.display = 'block';
    document.getElementById('password').required = true;
    document.getElementById('modal-title').textContent = 'Add New User';
    document.getElementById('user-modal').classList.add('active');
}

// Close User Modal
function closeUserModal() {
    document.getElementById('user-modal').classList.remove('active');
}

// Handle User Form Submit
async function handleUserFormSubmit(e) {
    e.preventDefault();

    const userId = document.getElementById('user-id').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;
    const status = document.getElementById('status').value;

    const db = window.db;

    if (userId) {
        // Update existing user
        try {
            const userRef = db.ref('users/' + userId);
            await userRef.update({
                username,
                email,
                role,
                status
            });
            alert('User updated successfully!');
        } catch (error) {
            console.error("Error updating user: ", error);
            alert('Error updating user: ' + error.message);
        }
    } else {
        // Add new user
        const secondaryAuth = window.secondaryAuth;
        try {
            // Create user in secondary auth (doesn't log current user out)
            const userCredential = await secondaryAuth.createUserWithEmailAndPassword(email, password);
            const newUid = userCredential.user.uid;

            // Add user details to Realtime Database
            const userRef = db.ref('users/' + newUid);
            await userRef.set({
                username,
                email,
                role,
                status,
                joined: new Date().toISOString().split('T')[0]
            });
            
            // Sign out the secondary app instance
            await secondaryAuth.signOut();

            alert('User created successfully!');
        } catch (error) {
            console.error("Error creating user: ", error);
            alert('Error creating user: ' + error.message);
            return;
        }
    }

    await fetchUsers(); // Re-fetch the user list
    closeUserModal();
}

// Filter Users
function filterUsers() {
    const searchTerm = document.getElementById('search-users').value.toLowerCase();
    const roleFilter = document.getElementById('role-filter').value;
    const statusFilter = document.getElementById('status-filter').value;

    filteredUsers = users.filter(user => {
        const matchesSearch = user.username.toLowerCase().includes(searchTerm) || 
                            user.email.toLowerCase().includes(searchTerm);
        const matchesRole = !roleFilter || user.role === roleFilter;
        const matchesStatus = !statusFilter || user.status === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
    });

    renderUsersTable();
}

// Render Users Table
function renderUsersTable() {
    const tbody = document.getElementById('users-tbody');
    tbody.innerHTML = '';

    filteredUsers.forEach(user => {
        const statusBadge = user.status === 'Active' ? 'badge-success' : 'badge-danger';
        const row = document.createElement('tr');
        // Truncate long IDs to show in the table
        const shortId = user.id.substring(0, 8) + '...';
        row.innerHTML = `
            <td title="${user.id}">${shortId}</td>
            <td><strong>${user.username}</strong></td>
            <td>${user.email}</td>
            <td><span class="badge">${user.role}</span></td>
            <td><span class="badge ${statusBadge}">${user.status}</span></td>
            <td>${user.joined || 'N/A'}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="window.editUser('${user.id}')">Edit</button>
                    <button class="btn-delete" onclick="window.deleteUser('${user.id}')">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Edit User
window.editUser = function(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;

    document.getElementById('user-id').value = user.id;
    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    document.getElementById('role').value = user.role;
    document.getElementById('status').value = user.status;
    
    // Hide password field when editing as we don't handle auth update here
    const pwdInput = document.getElementById('password');
    pwdInput.value = '';
    pwdInput.required = false;
    pwdInput.closest('.form-group').style.display = 'none';

    document.getElementById('modal-title').textContent = 'Edit User';
    document.getElementById('user-modal').classList.add('active');
};

// Delete User
window.deleteUser = async function(id) {
    if (confirm('Are you sure you want to delete this user from the dashboard list? Note: This deletes the Realtime Database profile, but cannot delete the Firebase Auth account directly from the client.')) {
        const db = window.db;
        try {
            const userRef = db.ref('users/' + id);
            await userRef.remove();
            await fetchUsers(); // Refresh list
        } catch(error) {
            console.error("Error deleting user: ", error);
            alert("Error deleting user: " + error.message);
        }
    }
};

// Update user stats
function updateStats() {
    const totalUsersElem = document.getElementById('total-users');
    if (totalUsersElem) {
        totalUsersElem.textContent = users.length;
    }
}
window.updateStats = updateStats;
