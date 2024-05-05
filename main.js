new Vue({
    el: '#app',
    data: {
        tasks: [],
        newTask: {
            topic: '',
            description: '',
            date: '',
        },
        showEditForm: false,
        
    },
    mounted() {
        // hiện task trong local storage
        if (localStorage.getItem('tasks')) {
            this.tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        this.retrieveTasksFromLocalStorage();
    },
    computed: {
        numberOfTasks() {
            return this.tasks.length;
        }
    },
    
    methods: {
        addTask() {
            if (!this.newTask.topic.trim() || !this.newTask.description.trim() || !this.newTask.date) {
                alert("Nhập đầy đủ thông tin");
                return;
            }
            this.tasks.push({
                topic: this.newTask.topic,
                description: this.newTask.description,
                date: this.newTask.date
            });
            this.saveTasksToLocalStorage(); 
            this.resetNewTask();
        },
        editTask(index) {
            if (confirm("Bạn muốn chỉnh sửa? ")) {
                this.newTask = { ...this.tasks[index] };
                this.showEditForm = true;
            }
        },
        saveEditedTask() {
            if (this.editingIndex !== null) {
                this.tasks.splice(this.editingIndex, 1, {
                    topic: this.newTask.topic,
                    description: this.newTask.description,
                    date: this.newTask.date
                });
                this.saveTasksToLocalStorage();
                this.editingIndex = null;
                this.showEditForm = false;
                this.resetNewTask();
            }
        },
//
        saveTasksToLocalStorage() {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        retrieveTasksFromLocalStorage() {
            const storedTasks = localStorage.getItem('tasks');
            if (storedTasks) {
                this.tasks = JSON.parse(storedTasks);
            }
        },
        resetNewTask() {
            this.newTask.topic = '';
            this.newTask.description = '';
            this.newTask.date = '';
        },
        deleteTask(index) {
            if (confirm("Bạn có chắc chắn muốn xóa to do list này không?")) {
                this.tasks.splice(index, 1);
            }
        },
        deleteTaskAll() {
            if(confirm("bạn có chắc chắn xóa tất cả to do list? ")){
                this.tasks = [];
                this.saveTasksToLocalStorage();
            }
        },

    },
    
});





