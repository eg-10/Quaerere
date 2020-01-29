<template>
    <div>
        <p>
            <strong>{{ answer.author }}</strong>
        </p>
        <p class="text-muted">Answered on {{ answer.created_at }}</p>
        <p>{{ answer.body }}</p>
        <hr>
    </div>
</template>

<script>
export default {
    name: 'AnswerComponent',
    props: {
        answer: {
            type: Object,
            required: true
        }
    }
}
</script>