<template>
    <div class="container">
        <div class="question mb-4">
            <h1 class="mb-4">{{ question.content }}</h1>
            <p>Posted by: <strong>{{ question.author }}</strong></p>
            <p>{{ question.created_at }}</p>
        </div>
        <hr>
        <AnswerComponent
            v-for="(answer,index) in answers"
            :answer="answer"
            :key="index"
        />
    </div>
</template>

<script>
import { apiService } from "../common/api.service.js";
import AnswerComponent from "@/components/Answer.vue";
export default {
    name: "Question",
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    components: {
        AnswerComponent
    },
    data() {
        return {
            question: {},
            answers: []
        };
    },
    methods: {
        setPageTitle(title) {
            document.title = title;
        },
        getQuestionData() {
            let endpoint = `/api/questions/${this.slug}/`;
            apiService(endpoint).then(data => {
                this.question = data;
                this.setPageTitle(data.content);
            });
        },
        getQuestionAnswers() {
            let endpoint = `/api/questions/${this.slug}/answers/`;
            apiService(endpoint).then(data => {
                this.answers = data.results;
            });
        }
    },
    created() {
        this.getQuestionData();
        this.getQuestionAnswers();
    }
};
</script>