<!-- Below code is tested on SheetJS v0.14.0 -->
<template>
  <v-container>
    <button
      type="button"
      v-on:click="onexport"
    >Excel download</button>
  </v-container>
</template>

<script>
import XLSX from "xlsx";

export default {
  data: () => ({
    Datas: {
      // We will make a Workbook contains 2 Worksheets
      animals: [
        { name: "cat", category: "animal" },
        { name: "dog", category: "animal" },
        { name: "pig", category: "animal" }
      ],
      pokemons: [
        { name: "pikachu", category: "pokemon" },
        { name: "Arbok", category: "pokemon" },
        { name: "Eevee", category: "pokemon" }
      ]
    }
  }),
  methods: {
    onexport() {
      // On Click Excel download button

      // export json to Worksheet of Excel
      // only array possible
      var animalWS = XLSX.utils.json_to_sheet(this.Datas.animals);
      var pokemonWS = XLSX.utils.json_to_sheet(this.Datas.pokemons);

      // A workbook is the name given to an Excel file
      var wb = XLSX.utils.book_new(); // make Workbook of Excel

      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(wb, animalWS, "animals"); // sheetAName is name of Worksheet
      XLSX.utils.book_append_sheet(wb, pokemonWS, "pokemons");

      // export Excel file
      XLSX.writeFile(wb, "book.xlsx"); // name of the file is 'book.xlsx'
    }
  }
};
</script>