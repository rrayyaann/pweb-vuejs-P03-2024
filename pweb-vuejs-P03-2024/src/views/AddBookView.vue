<script lang="ts">
import { defineComponent } from "vue";
import { format } from "date-fns";

export default defineComponent({
  name: "AddBookView",
  data() {
    return {
      title: "",
      author: "",
      publishedDate: "",
      publisher: "",
      description: "",
      coverImage: "",
      ratingAverage: 0,
      ratingCount: 0,
      tags: "",
      initialQty: 0,
      qty: 0,
      error: false,
      errorMsg: "",
    };
  },
  methods: {
    formatDate(date: string): string {
      return format(new Date(date), "dd MMMM yyyy");
    },
    async addBook() {
      const newBook = {
        title: this.title,
        author: this.author,
        publishedDate: this.formatDate(this.publishedDate),
        publisher: this.publisher,
        description: this.description,
        coverImage: this.coverImage,
        rating: {
          average: this.ratingAverage,
          count: this.ratingCount,
        },
        tags: this.tags.split(",").map((tag) => tag.trim()),
        initialQty: this.initialQty,
        qty: this.qty,
      };

      const response = await fetch("http://localhost:3030/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        alert("Book added successfully!");
        this.error = false;
        this.$router.push("/");
      } else {
        this.error = true;
        const data = await response.json();
        if (data.message.includes("duplicate")) {
          this.errorMsg = "Book already exists!";
        } else {
          this.errorMsg = data.message;
        }
      }
    },
  },
});
</script>

<template>
  <main class="mt-10 mx-8 pb-24">
    <h1 class="font-bold text-3xl text-center mb-2">Add New Book</h1>
    <form
      @submit.prevent="addBook"
      class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md"
    >
      <!-- Input fields untuk Book Details -->
      <div class="mb-4">
        <label for="title" class="block text-gray-700 font-bold mb-2">Title</label>
        <input
          v-model="title"
          id="title"
          type="text"
          placeholder="Masukkan judul buku"
          class="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <div class="mb-4">
        <label for="author" class="block text-gray-700 font-bold mb-2">Author</label>
        <input
          v-model="author"
          id="author"
          type="text"
          placeholder="Masukkan nama penulis"
          class="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <div class="mb-4">
        <label for="publishedDate" class="block text-gray-700 font-bold mb-2">Published Date</label>
        <input
          v-model="publishedDate"
          id="publishedDate"
          type="date"
          class="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <div class="mb-4">
        <label for="publisher" class="block text-gray-700 font-bold mb-2">Publisher</label>
        <input
          v-model="publisher"
          id="publisher"
          type="text"
          placeholder="Masukkan nama penerbit"
          class="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <div class="mb-4">
        <label for="description" class="block text-gray-700 font-bold mb-2">Description</label>
        <textarea
          v-model="description"
          id="description"
          placeholder="Masukkan deskripsi buku"
          class="w-full px-3 py-2 border rounded-lg"
          required
        ></textarea>
      </div>

      <div class="mb-4">
        <label for="coverImage" class="block text-gray-700 font-bold mb-2">Cover Image URL</label>
        <input
          v-model="coverImage"
          id="coverImage"
          type="url"
          placeholder="https://placehold.co/300x200"
          class="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <!-- Preview gambar cover jika URL valid -->
      <div v-if="coverImage" class="mb-4">
        <h4 class="text-gray-700 font-bold mb-2">Cover Preview</h4>
        <img
          :src="coverImage"
          alt="Cover Image Preview"
          class="w-full max-h-80 object-cover rounded-lg"
        />
      </div>

      <div class="mb-4">
        <label for="ratingAverage" class="block text-gray-700 font-bold mb-2">Rating Average</label>
        <input
          v-model="ratingAverage"
          id="ratingAverage"
          type="number"
          step="0.1"
          class="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <div class="mb-4">
        <label for="ratingCount" class="block text-gray-700 font-bold mb-2">Rating Count</label>
        <input
          v-model="ratingCount"
          id="ratingCount"
          type="number"
          class="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <div class="mb-4">
        <label for="tags" class="block text-gray-700 font-bold mb-2">Tags (comma separated)</label>
        <input
          v-model="tags"
          id="tags"
          type="text"
          placeholder="Adventure, Fiction, Mystery"
          class="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <div class="mb-4">
        <label for="initialQty" class="block text-gray-700 font-bold mb-2">Initial Quantity</label>
        <input
          v-model="initialQty"
          id="initialQty"
          type="number"
          class="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <div class="mb-4">
        <label for="qty" class="block text-gray-700 font-bold mb-2">Quantity</label>
        <input
          v-model="qty"
          id="qty"
          type="number"
          class="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <!-- Error Message -->
      <h5
        class="font-bold text-xl text-red-400 mb-8 text-center"
        v-show="error"
      >
        {{ errorMsg }}
      </h5>

      <div class="flex justify-center">
        <button
          type="submit"
          class="px-4 text-white py-2 bg-blue-400 font-semibold rounded-xl"
        >
          Add Book
        </button>
      </div>
    </form>
  </main>
</template>
