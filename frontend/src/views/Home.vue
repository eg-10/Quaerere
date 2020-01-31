<template>
    <div class="home mt-4">
        <div class="container">
            <div v-for="question in questions" :key="question.pk" class="question">
                <router-link
                    class="question-link"
                    :to="{ name: 'question', params: { slug: question.slug } }"
                >{{ question.content }}</router-link>
                <p>
                    Posted by:
                    <span class="author">{{ question.author }}</span>
                </p>
                <p>
                    {{ question.answers_count }} Answer<span v-if="question.answers_count !== 1">s</span>
                </p>
                <hr />
            </div>
            <div class="my-4">
                <p v-show="loadingQuestions">....Loading....</p>
                <button
                    v-show="next"
                    @click="getQuestions"
                    class="btn btn-sm btn-outline-success"
                >Load More</button>
            </div>
        </div>
    </div>
</template>

<script>
import { apiService } from "../common/api.service.js"
export default {
    name: "home",
    data() {
        return {
            questions: [],
            next: null,
            loadingQuestions: false
        }
    },
    methods: {
        getQuestions() {
            let endpoint = "/api/questions/";
            if (this.next) {
                endpoint = this.next;
            }
            this.loadingQuestions = true;
            apiService(endpoint)
                .then(data => {
                    this.questions.push(...data.results);
                    this.loadingQuestions = false;
                    if (data.next) {
                        this.next = data.next;
                    } else {
                        this.next = null;
                    }
                })
        }
    },
    created() {
        this.getQuestions();
        document.title = "Quaerere"
    }
};
</script>

<style>
.question {
    text-align: left;
}

.question-link {
    font-size: 2rem;
    color: black;
}

.question-link:hover {
    text-decoration: none;
    text-decoration-line: none;
    color: #5e5e5e;
}

.author {
    color: #ba2929;
    font-weight: bold;
}
</style>
