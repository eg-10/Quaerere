<template>
    <div>
        <p>
            <span class="answer-author">{{ answer.author }}</span>
        </p>
        <p
            :class="{'your-answer font-weight-bold': requestUser === answer.author, 'text-muted': requestUser!== answer.author}"
        >
            <span v-if="isAnswerAuthor">You</span>
            Answered on {{ answer.created_at }}
        </p>
        <p>{{ answer.body }}</p>
        <p>
            <strong>
                {{ likesCounter }} Like<span v-if="likesCounter !== 1">s</span>
            </strong>
        </p>
        <div v-if="isAnswerAuthor">
            <router-link
                :to="{ name: 'answer-editor' , params: {id: answer.id}}"
                class="btn btn-sm btn-outline-secondary mr-1"
            >Edit</router-link>
            <button class="btn btn-sm btn-outline-danger" @click="triggerDeleteAnswer">Delete</button>
        </div>
        <div v-else>
            <button
                class="btn btn-sm"
                @click="toggleLike"
                :class="{
                    'btn-danger':userLikedAnswer,
                    'btn-outline-danger': !userLikedAnswer
                }"
            >
                Like<span v-if="userLikedAnswer">d</span>
                [{{ likesCounter }}]
            </button>
        </div>
        <hr />
    </div>
</template>

<script>
import { apiService } from "@/common/api.service.js";

export default {
    name: "AnswerComponent",
    props: {
        answer: {
            type: Object,
            required: true
        },
        requestUser: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            userLikedAnswer: this.answer.user_has_voted,
            likesCounter: this.answer.likes_count
        };
    },
    computed: {
        isAnswerAuthor() {
            return this.answer.author === this.requestUser;
        }
    },
    methods: {
        triggerDeleteAnswer() {
            this.$emit("delete-answer", this.answer);
        },
        toggleLike() {
            this.userLikedAnswer === false
                ? this.likeAnswer()
                : this.unlikeAnswer();
        },
        likeAnswer() {
            this.userLikedAnswer = true;
            this.likesCounter += 1;
            let endpoint = `/api/answers/${this.answer.id}/like/`;
            apiService(endpoint, "POST");
        },
        unlikeAnswer() {
            this.userLikedAnswer = false;
            this.likesCounter -= 1;
            let endpoint = `/api/answers/${this.answer.id}/like/`;
            apiService(endpoint, "DELETE");
        }
    }
};
</script>

<style>
.your-answer {
    color: #ba2929;
}

.answer-author {
    font-weight: bold;
}
</style>