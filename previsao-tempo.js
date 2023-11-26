document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "8675f22a20411663d0876fd55d47dbca";
    const cidade = "rio de janeiro";
    const units = "metric";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=${units}&appid=${apiKey}`;

    const descricaoEmPortugues = {
        'clear sky': 'céu limpo',
        'few clouds': 'poucas nuvens',
        'scattered clouds': 'nuvens dispersas',
        'broken clouds': 'nuvens quebradas',
        'overcast clouds': 'nuvens nubladas',
        'light rain': 'chuva leve',
        'moderate rain': 'chuva moderada',
        'heavy rain': 'chuva pesada'
    };

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na solicitação à API');
        }
        return response.json();
    })
    .then(data => {
        const temperatura = data.main.temp;
        const descricao = data.weather[0].description;
        const cidade = data.name;

        console.log(data);

        const body = document.body;

        if (temperatura < 24) {
          body.style.backgroundImage = 'url("images/rj-chuva.jpg")';
      } else {
          body.style.backgroundImage = 'url("images/rj-sol.jpg")';
      }

        const descricaoTraduzida = descricaoEmPortugues[descricao.toLowerCase()] || descricao;

        const weatherContainer = document.querySelector('.weather-info');
        weatherContainer.innerHTML = `
            <h2>${temperatura}°C em ${cidade}</h2>
            <p>${descricaoTraduzida}</p>'
        `;
    })
    .catch(error => console.error('Erro ao obter dados do tempo:', error));

    async function obterPrevisaoSemana() {
      const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&units=${units}&cnt=7&appid=${apiKey}`;
      
      try {
          const resposta = await fetch(endpoint);
          const dados = await resposta.json();
  
          const previsaoDiv = document.querySelector('.previsao-tempo');
          previsaoDiv.innerHTML = ''; // Limpa o conteúdo atual, se houver
  
          const ul = document.createElement('ul');
          
          // Loop para exibir a previsão de cada dia
          dados.list.forEach(item => {
              const data = new Date(item.dt * 1000);
              const temperatura = item.main.temp;
              const descricao = item.weather[0].description;
  
              const descricaoTraduzida = descricaoEmPortugues[descricao.toLowerCase()] || descricao;
  
              const li = document.createElement('li');
              li.textContent = `Data: ${data.toLocaleDateString('pt-BR')}, Temperatura: ${temperatura}°C, Descrição: ${descricaoTraduzida}`;
  
              ul.appendChild(li);
          });
  
          previsaoDiv.appendChild(ul);
      } catch (erro) {
          console.error('Erro ao obter dados da API', erro);
      }
  }
  
  obterPrevisaoSemana();
})