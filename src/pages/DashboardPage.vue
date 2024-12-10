<template>
  <q-page class="q-pa-lg">
    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-h5">Visão Geral do Dashboard</div>
        <p>Visualize os dados do sistema com gráficos interativos.</p>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-h6">Usuários Ativos</div>
        <highcharts :options="activeUsersChart" />
      </q-card-section>
    </q-card>

    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-h6">Distribuição de Usuários</div>
        <highcharts :options="userDistributionChart" />
      </q-card-section>
    </q-card>

    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-h6">Crescimento Mensal</div>
        <highcharts :options="monthlyGrowthChart" />
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <div class="text-h6">Usuários Cadastrados</div>
        <q-list>
          <q-item v-for="user in users" :key="user.id">
            <q-item-section>
              <q-avatar>
                <img :src="user.avatar" alt="Avatar" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <div>{{ user.first_name }} {{ user.last_name }}</div>
              <div class="text-body2">{{ user.email }}</div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";

export default {
  name: "DashboardPage",
  components: {
    highcharts: HighchartsVue.component,
  },
  data() {
    return {
      activeUsersChart: {
        chart: {
          type: "column",
        },
        title: {
          text: "Usuários Ativos",
        },
        xAxis: {
          categories: ["Janeiro", "Fevereiro", "Março", "Abril"],
        },
        yAxis: {
          title: {
            text: "Quantidade",
          },
        },
        series: [
          { name: "Usuários", data: [29, 71, 106, 144] },
        ],
      },

      userDistributionChart: {
        chart: {
          type: "pie",
        },
        title: {
          text: "Distribuição de Usuários por Região",
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            },
          },
        },
        series: [
          {
            name: "Usuários",
            colorByPoint: true,
            data: [
              { name: "Norte", y: 35 },
              { name: "Sul", y: 25 },
              { name: "Leste", y: 20 },
              { name: "Oeste", y: 20 },
            ],
          },
        ],
      },

      monthlyGrowthChart: {
        chart: {
          type: "line",
        },
        title: {
          text: "Crescimento Mensal",
        },
        xAxis: {
          categories: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
        },
        yAxis: {
          title: {
            text: "Usuários Novos",
          },
        },
        series: [
          { name: "Crescimento", data: [50, 100, 150, 200, 300] },
        ],
      },      
    };
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
  },
};
</script>

<style scoped>
.q-card {
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}
.q-page {
  background-color: #f4f4f4;
}
.text-h6 {
  margin-bottom: 10px;
  font-weight: bold;
}
.q-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.q-item-section {
  margin-left: 10px;
}
</style>
