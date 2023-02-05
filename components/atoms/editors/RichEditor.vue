<template>
  <div>
    <BubbleMenu
      v-if="editor"
      :editor="editor"
      :tippy-options="{ duration: 100 }"
    >
      <v-list>
        <v-list-item>
          <MenuItem
            :class="{ 'is-active': editor.isActive('bold') }"
            @click="editor.chain().focus().toggleBold().run()"
          >
            <v-icon class="mr-1">
              mdi-format-bold
            </v-icon>
            <strong> Bold </strong>
          </MenuItem>
        </v-list-item>
        <v-list-item>
          <MenuItem
            :class="{ 'is-active': editor.isActive('italic') }"
            @click="editor.chain().focus().toggleItalic().run()"
          >
            <v-icon class="mr-1">
              mdi-format-italic
            </v-icon> <em> Italic </em>
          </MenuItem>
        </v-list-item>
        <v-list-item>
          <MenuItem
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          >
            <v-icon class="mr-1">
              mdi-format-header-1
            </v-icon>
            <h1>Heading 1</h1>
          </MenuItem>
        </v-list-item>
        <v-list-item>
          <MenuItem
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          >
            <v-icon class="mr-1">
              mdi-format-header-2
            </v-icon>
            <h2>Heading 2</h2>
          </MenuItem>
        </v-list-item>
        <v-list-item>
          <MenuItem
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          >
            <v-icon class="mr-1">
              mdi-format-header-3
            </v-icon>
            <h3>Heading 3</h3>
          </MenuItem>
        </v-list-item>
        <v-list-item>
          <MenuItem
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          >
            <v-icon class="mr-1">
              mdi-format-header-4
            </v-icon>
            <h4>Heading 4</h4>
          </MenuItem>
        </v-list-item>
        <v-list-item>
          <MenuItem
            :class="{ 'is-active': editor.isActive('bulletList') }"
            @click="editor.chain().focus().toggleBulletList().run()"
          >
            <v-icon class="mr-1">
              mdi-format-list-bulleted
            </v-icon>
            <ul>
              <li>Bullet list</li>
            </ul>
          </MenuItem>
        </v-list-item>
        <v-list-item>
          <MenuItem
            :class="{ 'is-active': editor.isActive('blockquote') }"
            @click="editor.chain().focus().toggleBlockquote().run()"
          >
            <v-icon class="mr-1">
              mdi-format-quote-open
            </v-icon>
            <blockquote>Block quote</blockquote>
          </MenuItem>
        </v-list-item>
        <v-list-item>
          <MenuItem @click="editor.chain().focus().setHorizontalRule().run()">
            <v-icon class="mr-1">
              mdi-minus
            </v-icon> Divider
          </MenuItem>
        </v-list-item>
        <v-list-item>
          <MenuItem
            :class="{ 'is-active': editor.isActive('codeBlock') }"
            @click="editor.chain().focus().toggleCodeBlock().run()"
          >
            <v-icon class="mr-1">
              mdi-xml
            </v-icon>
            <pre> <code> Code Block </code> </pre>
          </MenuItem>
        </v-list-item>
        <v-list-item>
          <MenuItem
            :class="{ 'is-active': editor.isActive('underline') }"
            @click="editor.chain().focus().toggleUnderline().run()"
          >
            <v-icon class="mr-1">
              mdi-format-underline
            </v-icon>
            <p style="text-decoration: underline">
              underline
            </p>
          </MenuItem>
        </v-list-item>
      </v-list>
    </BubbleMenu>
    <EditorContent :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import { StarterKit } from '@tiptap/starter-kit'
import MenuItem from '@/components/atoms/editors/MenuItem'

export default {
  components: {
    EditorContent,
    BubbleMenu,
    MenuItem
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  emits: ['update:value'],
  data () {
    return {
      editor: null
    }
  },
  mounted () {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit.configure({
          heading: [1, 2, 3, 4]
        })
      ],
      onUpdate: () => {
        this.$emit('update:value', this.editor.getHTML())
      }
    })
  }
}
</script>

<style scoped>
.bubble-menu-button {
  -transform: none;
}
</style>
