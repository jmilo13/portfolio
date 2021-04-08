const API = process.env.API;

const getData = async () => {
  const apiURl = `${API}${Math.floor(Math.random()*10)}`
  console.log(`la url final ES ${apiURl}`)
  try {
    const response = await fetch(apiURl);
    const data = await response.json();
    return data; 
  } catch (error) {
    console.log('Fetch Error', error);
  };
};

export default getData;