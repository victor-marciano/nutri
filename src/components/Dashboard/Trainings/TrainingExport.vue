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
    name: 'TrainingExport',
    data: () => ({
        
    }),

    props: {
        training: Object
    },

    methods: {
        generatePdf() { 
            var doc = new jsPDF({
                orientation: 'portrait'
            });

            doc.setFont("Helvetica")

            doc.addImage(require("../../../assets/fullLogo.png"), 'PNG', 10, 10, 60, 30)

            doc.text(this.training.name, doc.internal.pageSize.width - 50 , 25).setFontSize(11)
            doc.text(`Início: ${this.training.start}`, doc.internal.pageSize.width - 50 , 30).setFontSize(10)
            doc.text(`Fim: ${this.training.finish}`, doc.internal.pageSize.width - 50 , 35).setFontSize(10)
            doc.text(`Objetivo: ${this.training.objective}`, doc.internal.pageSize.width - 50 , 40).setFontSize(10)
            doc.line((doc.internal.pageSize.width - 10), 50, 10, 50)

            // table config
            var y = 70
            this.training.trainings.forEach(training => {                
                doc.text(training.weekDay, 15 , (y - 5))
                
                let exercises = Object.values(training.exercises)
                
                doc.autoTable({
                    styles: { fillColor: "#81C784" },
                    margin: { top: 10 },
                    body: exercises,
                    columns: [
                        { header: 'Exercício', dataKey: 'name' },
                        { header: 'Séries/Repetições', dataKey: 'series' },
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