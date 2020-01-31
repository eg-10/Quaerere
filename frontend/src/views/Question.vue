<template>
    <div class="container">
        <div class="question mb-4">
            <h1 class="mb-4">{{ question.content }}</h1>
            <p>
                Posted by:
                <span class="author">{{ question.author }}</span>
            </p>
            <p>{{ question.created_at }}</p>
            <QuestionActions
                v-if="isQuestionAuthor"
                :slug="question.slug"
            />
        </div>
        <div v-if="userHasAnswered">
            <p class="answer-added mt-4">You've written an answer!</p>
        </div>
        <div v-else-if="showForm">
            <form class="card mt-4 mb-4" @submit.prevent="onSubmit">
                <div class="card-header px-3">Answer the Question</div>
                <div class="m-4">
                    <textarea
                        v-model="newAnswerBody"
                        class="form-control"
                        placeholder="Share your Knowledge!"
                        rows="5"
                    ></textarea>
                </div>
                <div class="card-footer px-3">
                    <button type="submit" class="btn btn-sm btn-success mr-1">Submit</button>
                    <button @click="showForm = false" class="btn btn-sm btn-light mr-1">Cancel</button>
                </div>
            </form>
            <p class="error mt-3">{{ error }}</p>
        </div>
        <div v-else>
            <button class="btn btn-sm btn-success mt-4 mb-4" @click="showForm = true">Write an Answer!</button>
        </div>
        <hr />
        <AnswerComponent v-for="answer in answers" 
            :answer="answer" 
            :key="answer.id" 
            :requestUser="requestUser"
            @delete-answer="deleteAnswer" />
        <div>
            <p v-show="loadingAnswers">....Loading....</p>
            <button
                v-show="next"
                @click="getQuestionAnswers"
                class="btn btn-sm btn-outline-success"
            >Load More</button>
        </div>
    </div>
</template>

<script>
import { apiService } from "../common/api.service.js";
import AnswerComponent from "@/components/Answer.vue";
import QuestionActions from "@/components/QuestionActions.vue";
export default {
    name: "Question",
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    components: {
        AnswerComponent,
        QuestionActions
    },
    data() {
        return {
            question: {},
            answers: [],
            newAnswerBody: null,
            error: null,
            userHasAnswered: false,
            showForm: false,
            next: null,
            loadingAnswers: false,
            requestUser: null
        };
    },
    computed: {
        isQuestionAuthor() {
            return this.question.author === this.requestUser;
        }
    },
    methods: {
        setPageTitle(title) {
            document.title = title;
        },
        setRequestUser() {
            this.requestUser = window.localStorage.getItem("username");
        },
        getQuestionData() {
            let endpoint = `/api/questions/${this.slug}/`;
            apiService(endpoint).then(data => {
                this.question = data;
                this.userHasAnswered = data.user_has_answered;
                this.setPageTitle(data.content);
            });
        },
        getQuestionAnswers() {
            let endpoint = `/api/questions/${this.slug}/answers/`;
            if (this.next) {
                endpoint = this.next;
            }
            apiService(endpoint).then(data => {
                this.answers.push(...data.results);
                this.loadingAnswers = false;
                if (data.next) {
                    this.next = data.next;
                } else {
                    this.next = null;
                }
            });
        },
        onSubmit() {
            if (this.newAnswerBody) {
                let endpoint = `/api/questions/${this.slug}/answer/`;
                apiService(endpoint, "POST", { body: this.newAnswerBody }).then(
                    data => {
                        this.answers.unshift(data);
                    }
                );
                this.newAnswerBody = null;
                this.showForm = false;
                this.userHasAnswered = true;
                if (this.error) {
                    this.error = null;
                }
            } else {
                    this.error = "You can't submit an empty answer!";
            }
        },
        async deleteAnswer(answer) {
            let endpoint = `/api/answers/${answer.id}/`;
            await apiService(endpoint, "DELETE")
            this.$delete(this.answers, this.answers.indexOf(answer))
            this.userHasAnswered = false;
        }
    },
    created() {
        this.getQuestionData();
        this.getQuestionAnswers();
        this.setRequestUser();
    }
};
</script>

<style>
.answer-added {
    font-weight: bold;
    color: green;
}

.error {
    font-weight: bold;
    color: crimson;
}
</style>