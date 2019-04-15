
class UI {
    constructor() {
        this.posts = document.querySelector("#posts");
        this.titleInput = document.querySelector("#title");
        this.bodyInput = document.querySelector("#body");
        this.idInput = document.querySelector("#id");
        this.postSubmit = document.querySelector(".post-submit");
        this.formState = "add";
    }

    showPosts(posts) {
        let output = "";

        posts.forEach(element => {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${element.title}</h4>
                        <p class="card-text">${element.body}</p>

                        <a href="#" class="edit card-link" data-id="${element.id}"><i class="fa far fa-edit"></i></a>

                        <a href="#" class="delete card-link" data-id="${element.id}"><i class="fas fa-trash-alt"></i></a>
                    </div>
                </div>
            `;
        });

        this.posts.innerHTML = output;
    }

    showAlert(msg, className) {
        this.clearAlert();

        // Create div
        const div = document.createElement("div");
        div.className = className;
        div.appendChild(document.createTextNode(msg));

        // Get parent
        const container = document.querySelector(".postsContainer");

        // Get posts
        const posts = document.querySelector("#posts");

        // Insert alert div
        container.insertBefore(div, posts);

        // Timeout
        setTimeout(() => {
            this.clearAlert();
        }, 3000);

    };

    clearAlert() {
        const currentAlert = document.querySelector(".alert");

        if (currentAlert) {
            currentAlert.remove();
        }
    };

    clearFields() {
        this.titleInput.value = "";
        this.bodyInput.value = "";
    };

    // Fill form to edit
    fillForm(data) {
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        this.changeFormState("edit");
    }

    // Clear id input
    clearIdInput() {
        this.idInput.value = "";
    }

    // Change form state
    changeFormState(type) {
        if (type === "edit") {
            this.postSubmit.textContent = "Update Post";
            this.postSubmit.className = "post-submit btn btn-warning btn-block";

            // Create cancel btn
            if(document.querySelector(".post-cancel")){
                document.querySelector(".post-cancel").remove();
            };

            const btn = document.createElement("button");
            btn.className = "post-cancel btn btn-dark btn-block";
            btn.appendChild(document.createTextNode("Cancel Edit"));

            // Get parent
            const cardForm = document.querySelector(".card-form");

            // Get element to insert before
            const formEnd = document.querySelector(".form-end");

            // Insert
            cardForm.insertBefore(btn, formEnd);
        } else {
            this.postSubmit.textContent = "Post It";
            this.postSubmit.className = "post-submit btn btn-primary btn-block";

            if (document.querySelector(".post-cancel")) {
                document.querySelector(".post-cancel").remove();
            }

            // Clear id & text fields
            this.clearIdInput();
            this.clearFields();
        }
    }
}

const ui = new UI();

export default ui;