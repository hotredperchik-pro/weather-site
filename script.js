document.getElementById('subscribeForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const city = document.getElementById('city').value.trim();
    const message = document.getElementById('message');

    // Простая валидация
    if (!email || !city) {
        message.className = 'message error';
        message.textContent = 'Заполните оба поля!';
        return;
    }

    // Здесь ТВОЙ URL-адрес вебхука из n8n
    // Как получишь — вставь его сюда
    const WEBHOOK_URL = 'https://girsha.app.n8n.cloud/webhook/08eab8dd-d7f1-4705-8d87-359974e4c9d3';

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, city })
        });

        if (response.ok) {
            message.className = 'message success';
            message.textContent = '✅ Подписка оформлена! Проверьте вашу почту.';
            document.getElementById('subscribeForm').reset();
        } else {
            message.className = 'message error';
            message.textContent = '❌ Ошибка при отправке. Попробуйте позже.';
        }
    } catch (error) {
        message.className = 'message error';
        message.textContent = '❌ Ошибка соединения. Проверьте интернет.';
        console.error('Ошибка:', error);
    }
});