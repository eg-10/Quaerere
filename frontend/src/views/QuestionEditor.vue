<template>
    <div class="container mt-2">
        <h1 class="mb-3"><span v-if="slug">Edit your</span><span v-else>Ask a</span> Question</h1>
        <form @submit.prevent="onSubmit">
            <textarea
                v-model="question_body"
                class="form-control"
                placeholder="What do you want to ask?"
                rows="5"
            ></textarea>
            <br />
            <button type="submit" class="btn btn-success mr-1">Publish</button>
            <router-link 
                v-if="slug"
                class="btn btn-md btn-light mr-1"
                :to="{ name: 'question', params: { slug: slug } }"
                >Cancel
            </router-link>
        </form>
        <p v-if="error" class="muted mt-2">{{ error }}</p>
    </div>
</template>

<script>
import { apiService } from "@/common/api.service.js";
export default {
    name: "QuestionEditor",
    props: {
        slug: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            question_body: null,
            error: null
        };
    },
    methods: {
        onSubmit() {
            // Tell the REST API to create or update a Question Instance
            if (!this.question_body) {
                this.error = "You can't publish an empty question!";
            } else if (this.question_body.length > 240) {
                this.error =
                    "The question can't have more than 240 characters!";
            } else {
                let endpoint = "/api/questions/";
                let method = "POST";
                if (this.slug !== undefined) {
                    endpoint += `${this.slug}/`;
                    method = "PUT";
                }
                apiService(endpoint, method, {
                    content: this.question_body
                }).then(question_data => {
                    this.$router.push({
                        name: "question",
                        params: { slug: question_data.slug }
                    });
                });
            }
        }
    },
    async beforeRouteEnter(to, from, next) {
        // if the component will be used to update a question, then get the question's data from the REST API
        if (to.params.slug !== undefined) {
            let endpoint = `/api/questions/${to.params.slug}/`;
            let data = await apiService(endpoint);
            return next(vm => (vm.question_body = data.content));
        } else {
            return next();
        }
    },
    created() {
        document.title = "Editor - Quaerere";
    }
};
</script>

<style scoped>
h1 {
    font-family: 'Crimson Text', serif;
    font-weight: 700;
}

textarea {
    resize: none;
}
</style>