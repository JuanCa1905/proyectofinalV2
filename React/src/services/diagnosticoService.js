export async function diagnosticarEnfermedad(imagen) {
    const formData = new FormData();
    formData.append("images", imagen);
    formData.append("organs", JSON.stringify(["leaf"]));
    formData.append("modifiers", JSON.stringify(["crops_fast", "similar_images"]));
    formData.append("language", "es");
    
    const response = await fetch("https://api.plant.id/v2/health_assessment", {
      method: "POST",
      headers: {
        "Api-Key": "F9PZrlpAJ0ugm9KGXn0ZLhHjTQasBRWzeWdNTUFP6y1AjsalVI", 
      },
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Error al comunicarse con Plant.id");
    }
  
    const data = await response.json();
    return data;
  }
  