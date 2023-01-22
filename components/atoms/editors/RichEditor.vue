<template>
  <div>
    <BubbleMenu
      v-if="editor"
      :editor="editor"
      :tippy-options="{ duration: 100 }" >
      <v-list>
        <v-list-item class="ma-0 pa-0">
          <v-card flat>
            <!-- TODO: コンポーネント化したい -->
            <v-btn
              text small
              class="bubble-menu-button"
              :class="{ 'is-active': editor.isActive('bold') }"
              @click="editor.chain().focus().toggleBold().run()" >
              <v-icon> mdi-format-bold </v-icon>  <strong> Bold </strong>
            </v-btn>
          </v-card>
        </v-list-item>
        <v-list-item class="pa-0">
          <v-btn
            text small
            class="bubble-menu-button"
            :class="{ 'is-active': editor.isActive('italic') }"
            @click="editor.chain().focus().toggleItalic().run()" >
            <v-icon> mdi-format-italic </v-icon> <em> Italic </em>
          </v-btn>
        </v-list-item>
        <v-list-item class="pa-0">
          <v-btn
            text small
            class="bubble-menu-button"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" >
            <v-icon> mdi-format-header-1 </v-icon> <h1> Heading 1 </h1>
          </v-btn>
        </v-list-item>
        <v-list-item class="pa-0">
          <v-btn
            text small
            class="bubble-menu-button"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" >
            <v-icon> mdi-format-header-2 </v-icon> <h2> Heading 2 </h2> 
          </v-btn>
        </v-list-item>
        <v-list-item class="pa-0">
          <v-btn
            text small
            class="bubble-menu-button"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" >
            <v-icon> mdi-format-header-3 </v-icon> <h3> Heading 3 </h3>
          </v-btn>
        </v-list-item>
        <v-list-item class="pa-0">
          <v-btn
            text small
            class="bubble-menu-button"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" >
            <v-icon> mdi-format-header-4 </v-icon> <h4> Heading 4 </h4>
          </v-btn>
        </v-list-item>
        <v-list-item class="pa-0">
          <v-btn
            text small
            class="bubble-menu-button"
            :class="{ 'is-active': editor.isActive('bulletList') }"
            @click="editor.chain().focus().toggleBulletList().run()" >
            <v-icon> mdi-format-list-bulleted </v-icon> <ul><li>Bullet list</li></ul>
          </v-btn>
        </v-list-item>
        <v-list-item class="pa-0">
          <v-btn
            text small
            class="bubble-menu-button"
            :class="{ 'is-active': editor.isActive('blockquote') }"
            @click="editor.chain().focus().toggleBlockquote().run()" >
            <v-icon> mdi-format-quote-open </v-icon> <blockquote> Block quote </blockquote>
          </v-btn>
        </v-list-item>
        <v-list-item class="pa-0">
          <v-btn
            text small
            class="bubble-menu-button"
            @click="editor.chain().focus().setHorizontalRule().run()" >
            <v-icon> mdi-minus </v-icon> Divider
          </v-btn>
        </v-list-item>
      </v-list>
    </BubbleMenu>
    <EditorContent :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-2'
import { StarterKit } from '@tiptap/starter-kit'

export default {
  components: {
    EditorContent,
    BubbleMenu,
  },
  props: {
    value: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      editor: null,
    }
  },
  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit.configure({
          heading: [1, 2, 3, 4]
        }),
      ],
      onUpdate: () => {
        this.$emit('update:value', this.editor.getHTML())
      }
    })
  },
}
</script>

<style scoped>
.bubble-menu-button {
  text-transform: none;
}
</style>
