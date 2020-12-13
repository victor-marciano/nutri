<template>
  <v-simple-table dense>
    <template v-slot:default>
        <thead>
            <tr>
            <th class="text-left">
                Valor
            </th>
            <th class="text-left">
                Situação
            </th>
            </tr>
        </thead>
    <tbody>
        <tr
        v-for="item in items"
        :key="item.situation"
        >
        <td>{{ item.value }}</td>
        <td>{{ item.situation }}</td>
        </tr>
    </tbody>
    </template>
</v-simple-table>
</template>

<script>
export default {
    name: 'ImcTable',
    data: () => ({
        items: [
            { value: '< 16', situation: 'Sub-peso gravíssimo' },
            { value: '16 - 16,9', situation: 'Sub-peso grave' },
            { value: '17 - 18,5', situation: 'Sub-peso' },
            { value: '18,5 - 24,9', situation: 'Peso Normal' },
            { value: '25 - 29,9', situation: 'Sobrepeso' },
            { value: '30 - 34,9', situation: 'Obesidade' },
            { value: '35 - 39,9', situation: 'Obesidade grau 2' },
            { value: '>=40', situation: 'Obesidade mórbida' },
        ]
    })
}
</script>

<style>

</style>