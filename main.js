new Vue({
    el: '#app',
    data: {
        newTask: {
            topic: '',
            description: '',
            date: ''
        },
        tasks: JSON.parse(localStorage.getItem('tasks')) || [],
        showEditForm: false,
        editingIndex: null,
        isLoaded: false
    },
    mounted() {
        // Check for stored tasks in localStorage
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            this.tasks = JSON.parse(storedTasks);
        }
        
        // Initialize current date as default
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        
        this.newTask.date = `${yyyy}-${mm}-${dd}`;
        
        // Add animation classes after component is mounted
        setTimeout(() => {
            this.isLoaded = true;
        }, 100);
    },
    computed: {
        numberOfTasks() {
            return this.tasks.length;
        }
    },
    methods: {
        addTask() {
            // Validate form fields
            if (!this.newTask.topic.trim() || !this.newTask.description.trim() || !this.newTask.date) {
                this.showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Create a new task object
            const task = {
                topic: this.newTask.topic.trim(),
                description: this.newTask.description.trim(),
                date: this.newTask.date,
                completed: false,
                createdAt: new Date().toISOString()
            };
            
            // Add to tasks array
            this.tasks.push(task);
            
            // Save to localStorage
            this.saveTasks();
            
            // Reset form
            this.resetForm();
            
            // Show success notification
            this.showNotification('Task added successfully', 'success');
        },
        
        deleteTask(index) {
            // Ask for confirmation
            if (confirm('Are you sure you want to delete this task?')) {
                // Remove the task from the array
                this.tasks.splice(index, 1);
                
                // Update localStorage
                this.saveTasks();
                
                // Show notification
                this.showNotification('Task deleted', 'info');
            }
        },
        
        editTask(index) {
            // Set the editing index
            this.editingIndex = index;
            
            // Copy task data to form
            this.newTask = { ...this.tasks[index] };
            
            // Show edit form
            this.showEditForm = true;
        },
        
        saveEditedTask() {
            // Validate form fields
            if (!this.newTask.topic.trim() || !this.newTask.description.trim() || !this.newTask.date) {
                this.showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Update the task
            this.tasks[this.editingIndex] = {
                ...this.tasks[this.editingIndex],
                topic: this.newTask.topic.trim(),
                description: this.newTask.description.trim(),
                date: this.newTask.date,
                updatedAt: new Date().toISOString()
            };
            
            // Update localStorage
            this.saveTasks();
            
            // Reset and hide form
            this.resetForm();
            this.showEditForm = false;
            
            // Show notification
            this.showNotification('Task updated successfully', 'success');
        },
        
        deleteTaskAll() {
            // Ask for confirmation
            if (confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
                // Clear tasks array
                this.tasks = [];
                
                // Update localStorage
                localStorage.removeItem('tasks');
                
                // Show notification
                this.showNotification('All tasks have been deleted', 'info');
            }
        },
        
        resetForm() {
            // Reset form to default values
            this.newTask = {
                topic: '',
                description: '',
                date: this.getCurrentDate()
            };
            this.editingIndex = null;
        },
        
        saveTasks() {
            // Save tasks to localStorage
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        
        getCurrentDate() {
            const today = new Date();
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1;
            let dd = today.getDate();
            
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            
            return `${yyyy}-${mm}-${dd}`;
        },
        
        showNotification(message, type) {
            // This method could be expanded to show proper notifications
            // For now we'll just use alert
            // In a real application, you might use a toast notification library
            alert(message);
        },
        
        toggleTaskCompletion(index) {
            this.tasks[index].completed = !this.tasks[index].completed;
            this.saveTasks();
        }
    }
});