<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  data: () => ({
    chartdata: {
      labels: ['Carbohidratos', 'Proteínas', 'Gorduras'],
      datasets: [
        {
          backgroundColor: '#f87979',
          data: [40, 20, 40]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true
    }
  }),

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>