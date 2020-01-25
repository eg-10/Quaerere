<template>
    <div class="home m-4">
        <div class="container">
            <div v-for="question in questions"
                :key="question.pk" class="question">
                <h2>{{ question.content }}</h2>
                <p>Posted by:
                    <span>{{ question.author }}</span>
                </p>
                <p>{{ question.answers_count }} Answer<span v-if="question.answers_count > 1">s</span></p>
                <hr>
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
            questions: []
        }
    },
    methods: {
        getQuestions() {
            let endpoint = "api/questions/";
            apiService(endpoint)
                .then(data => {
                    this.questions.push(...data.results);
                })
        }
    },
    created() {
        this.getQuestions()
    }
};
</script>

<style>
.question {
    text-align: left;
}
</style>
