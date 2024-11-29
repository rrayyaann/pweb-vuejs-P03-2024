<script lang="ts">
import { RouterLink } from "vue-router";
import type { PropType } from "vue";

export interface BookObject {
  _id: string;
  title: string;
  author: string;
  publishedDate: string;
  tags: string[];
  initialQty: number;
  qty: number;
  publisher: string;
  coverImage?: string;  // Pastikan ada properti coverImage
}

export default {
  name: "BookCard",
  components: {
    RouterLink,
  },
  props: {
    book: {
      type: Object as PropType<BookObject>,
      required: true,
    },
  },
  methods: {
    getReadMoreLink(id: string) {
      return `/detail/${id}`;
    },
  },
};
</script>

<template>
  <div class="border border-black rounded-xl px-6 pt-6 pb-8">
    <!-- Menggunakan coverImage jika ada, jika tidak, menggunakan placeholder -->
    <img
      :src="book.coverImage || 'https://placehold.co/300x200'"
      alt="Cover Image"
      class="rounded-xl mb-4 w-full"
    />
    <h3 class="text-xl font-bold text-left">
      {{ book.title }} | {{ book.author }}
    </h3>
    <hr class="my-2 border border-black" />
    <h5 class="text-md font-medium text-left">
      Published: {{ book.publishedDate }} by {{ book.publisher }}
    </h5>
    <h5 class="text-md font-medium text-left">
      Category: {{ book.tags.join(", ") }}
    </h5>
    <h5 class="text-md font-medium text-left">
      Quantity: {{ book.qty }} of {{ book.initialQty }} books
    </h5>
    <RouterLink
      :to="getReadMoreLink(book._id)"
      class="px-4 text-white py-2 bg-blue-400 font-semibold rounded-xl inline-block mt-2"
      >Read More</RouterLink
    >
  </div>
</template>