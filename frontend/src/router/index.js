import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Question from '../views/Question.vue'
import QuestionEditor from '../views/QuestionEditor.vue'
import AnswerEditor from '@/views/AnswerEditor.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/ask',
    name: 'question-editor',
    component: QuestionEditor
  },
  {
    path: '/question/:slug',
    name: 'question',
    component: Question,
    props: true
  },
  {
    path: '/answer/:id',
    name: "answer-editor",
    component: AnswerEditor,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
