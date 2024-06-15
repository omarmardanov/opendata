document.addEventListener('DOMContentLoaded', function() {
    // URL API
    const apiUrl = 'https://api.opendata.az/v2/az/json/statistics/ecology/NumberOfNationalParksAndReserves';

    // Функция для получения данных из API
    async function fetchData() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }

    // Функция для создания графика
    async function createChart() {
        const data = await fetchData();
        const labels = data.map(item => item.year);  // Предполагается, что данные имеют поле 'year'
        const values = data.map(item => item.count); // Предполагается, что данные имеют поле 'count'

        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar', // Тип графика: столбчатая диаграмма
            data: {
                labels: labels,
                datasets: [{
                    label: 'Количество национальных парков и заповедников',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Создаем график после загрузки данных
    createChart();
});
