<div ref="el" />

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import Example from './simple.jsx'

const el = ref()
onMounted(() => {
  const root = createRoot(el.value)
   root.render(createElement(Example, {}, null))
})
</script>