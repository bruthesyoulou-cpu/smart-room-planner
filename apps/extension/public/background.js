chrome.alarms.create('checkAlerts', { periodInMinutes: 5 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'checkAlerts') {
    fetch('http://localhost:4000/api/alerts', { headers: { 'x-role': 'reception' } })
      .then(r => r.json())
      .then(alerts => {
        alerts.slice(0, 3).forEach((a) => {
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon128.png',
            title: a.title,
            message: a.message,
            priority: a.type === 'critical' ? 2 : 0,
          });
        });
      })
      .catch(() => {});
  }
});