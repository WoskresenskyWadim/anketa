// pages/index.js
import { useState } from 'react';

export default function Анкета() {
  const [formData, setFormData] = useState({
    'Идентификационный №': '',
    'ФИО': '',
    'Дата рождения': '',
    'Воинское звание': '',
    'Личный номер': '',
    'Войсковая часть': '',
    'Категория пациентов': '',
    'Точки эвакуации, лечение в госпиталях': '',
    'Военный госпиталь, филиал, направивший на лечение': '',
    'Наименование медицинской организации': '',
    'Цель госпитализации': '',
    'Диагноз': '',
    'Сопутствующие заболевания, травмы': '',
    'Код по МКБ': '',
    'Дата и время получения ранения/заболевания': '',
    'Признак ампутации': '',
    'Готовность культи': '',
    'Дата готовности': '',
    'Консультация протезиста': '',
    'Дата протезирования': '',
    'Дата поступления в медицинскую организацию': '',
    'Дата выписки из медицинской организации': '',
    'Койко-дни стационар': '',
    'Наличие формы 100': '',
    'Справка о ранении': '',
    'ВВК на тяжесть увечья': '',
    'ВВК на категорию годности': '',
    'МСЭ': '',
    'Наличие паспорта': '',
    'Наличие в/билета': '',
    'Куда выписан': '',
    'Регион проживания': '',
    'Примечание': ''
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const categories = ['Ранение', 'Заболевание', 'Ампутация'];
  const militaryHospitals = [
    "ГВКГ им. Н.Н.Бурденко",
    "Филиал Nº 1 ГВКГ, Сокольники",
    "Филиал Nº 3 ГВКГ, г. Купавна",
    "Филиал Nº 5 ГВКГ, г. Москва",
    "Филиал Nº 7 ГВКГ, г. Сергиев Посад",
    "Филиал Nº 8 ГВКГ, г. Химки",
    "НМИЦ ВМТ им.А.А.Вишневского",
    "Филиал Nº1 НМИЦ ВМТ, г. Красногорск",
    "Филиал Nº 2 НМИЦ ВМТ г. Москва",
    "Филиал Nº 3 НМИЦ ВМТ, г. Одинцово",
    "Филиал Nº 4 НМИЦ ВМТ, г. Краснознаменск",
    "Филиал Nº 5 НМИЦ ВМТ, г. Сергиев Посад",
    "1586 ВКГ МВО, г. Подольск",
    "Филиал Nº 2 1586 ВКГ, г. Солнечногорск",
    "Филиал Nº 3 1586 ВКГ, г. Наро-Фоминск",
    "Филиал Nº 5 1586 ВКГ, г. Долгопрудный",
    "Филиал Nº8 1586 ВКГ, п. Селятино",
    "Филиал Nº10 1586 ВКГ, г. Кубинка",
    "Филиал Nº 12 1586ВКГ, г. Пушкино"
  ];
  const medicalOrgs = [
    "Долгопрудненская больница",
    "Красногорская больница",
    "Московский областной госпиталь для ветеранов войн",
    "Мытищинская областная клиническая больница",
    "Сергиево-Посадская больница",
    "Щелковская больница",
    "Одинцовская областная больница",
    "Подольская областная клиническая больница",
    "Пушкинская клиническая больница им. проф. Розанова В.Н.",
    "Солнечногорская больница"
  ];
  const yesNo = ['Да', 'Нет'];
  const fitnessCategories = ['Нет', 'А', 'Б', 'В', 'Д'];

  const renderSelect = (label, options, required = false) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        name={label}
        value={formData[label]}
        onChange={handleChange}
        required={required}
        className="w-full p-2 border rounded"
      >
        <option value="">— Выберите —</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  const renderInput = (label, type = 'text', required = false) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={label}
        value={formData[label]}
        onChange={handleChange}
        required={required}
        className="w-full p-2 border rounded"
      />
    </div>
  );

  const renderTextarea = (label, required = false) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        name={label}
        value={formData[label]}
        onChange={handleChange}
        required={required}
        rows="3"
        className="w-full p-2 border rounded"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-6">Анкета пациента</h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {renderInput('Идентификационный №', 'text', true)}
          {renderInput('ФИО', 'text', true)}
          {renderInput('Дата рождения', 'date', true)}
          {renderInput('Воинское звание')}
          {renderInput('Личный номер')}
          {renderInput('Войсковая часть')}

          {renderSelect('Категория пациентов', categories, true)}

          {renderTextarea('Точки эвакуации, лечение в госпиталях')}
          {renderSelect('Военный госпиталь, филиал, направивший на лечение', militaryHospitals)}
          {renderSelect('Наименование медицинской организации', medicalOrgs)}
          {renderInput('Цель госпитализации')}
          {renderInput('Диагноз')}
          {renderTextarea('Сопутствующие заболевания, травмы')}
          {renderInput('Код по МКБ')}
          {renderInput('Дата и время получения ранения/заболевания', 'datetime-local')}

          {renderSelect('Признак ампутации', yesNo, true)}
          {renderSelect('Готовность культи', yesNo, true)}
          {renderInput('Дата готовности', 'date')}
          {renderInput('Консультация протезиста')}
          {renderInput('Дата протезирования', 'date')}
          {renderInput('Дата поступления в медицинскую организацию', 'date')}
          {renderInput('Дата выписки из медицинской организации', 'date')}
          {renderInput('Койко-дни стационар')}

          {renderSelect('Наличие формы 100', yesNo)}
          {renderSelect('Справка о ранении', yesNo)}
          {renderSelect('ВВК на тяжесть увечья', yesNo)}
          {renderSelect('ВВК на категорию годности', fitnessCategories)}
          {renderSelect('МСЭ', yesNo)}
          {renderSelect('Наличие паспорта', yesNo)}
          {renderSelect('Наличие в/билета', yesNo)}

          {renderInput('Куда выписан')}
          {renderInput('Регион проживания')}
          {renderTextarea('Примечание')}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {status === 'sending' ? 'Отправка...' : 'Сохранить данные'}
          </button>

          {status === 'success' && (
            <p className="text-green-600 text-center mt-4">✅ Данные успешно сохранены!</p>
          )}
          {status === 'error' && (
            <p className="text-red-600 text-center mt-4">❌ Ошибка при отправке. Попробуйте позже.</p>
          )}
        </form>
      </div>
    </div>
  );
}
