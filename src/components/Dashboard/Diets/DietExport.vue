<template>
  <v-btn icon @click="generatePdf">
      <v-icon>
      mdi-file-export

      </v-icon>
  </v-btn>
</template>

<script>
import jsPDF from 'jspdf'
import "jspdf-autotable";

export default {
    name: 'DietExport',
    data: () => ({
        
    }),

    props: {
        diet: Object
    },

    methods: {
        generatePdf() { 
            var doc = new jsPDF({
                orientation: 'portrait'
            });

            doc.setFont("Helvetica")

            doc.addImage(require("../../../assets/fullLogo.png"), 'PNG', 10, 10, 60, 30)

            doc.text(this.diet.name, doc.internal.pageSize.width - 50 , 25).setFontSize(10)
            doc.text(`Início: ${this.diet.start}`, doc.internal.pageSize.width - 50 , 30).setFontSize(10)
            doc.text(`Fim: ${this.diet.finish}`, doc.internal.pageSize.width - 50 , 35).setFontSize(10)
            doc.text(`Objetivo: ${this.diet.objective}`, doc.internal.pageSize.width - 50 , 40).setFontSize(10)
            doc.line((doc.internal.pageSize.width - 10), 50, 10, 50)

            // table config
            var y = 70
            this.diet.meals.forEach(meal => {                
                doc.text(`${meal.name} - ${meal.time}`, 15 , (y - 5))
                
                let foods = meal.foods.map(food => { 
                    let foodData = Object.assign({}, food.data) 
                    foodData = Object.assign(foodData, { qtd: food.qtd}) 
                    return foodData;
                })

                doc.autoTable({
                    styles: { fillColor: "#81C784" },
                    margin: { top: 10 },
                    body: foods,
                    columns: [
                        { header: 'Alimento', dataKey: 'name' },
                        { header: 'Quantidade(g)', dataKey: 'qtd' },
                        { header: 'Calorias(kcal)', dataKey: 'kcal' },
                        { header: 'Carbohidratos(g)', dataKey: 'carbs' },
                        { header: 'Proteínas(g)', dataKey: 'protein' },
                        { header: 'Gorduras(g)', dataKey: 'fats' },
                    ],
                    startY: y
                })    
                y += 70
            })

        doc.text("@2020 Nutrimars", 10, doc.internal.pageSize.height - 10)
            doc.save(`Teste.pdf`);
        }
    }
}
</script>

<style>

</style>