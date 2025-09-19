// src/components/pages/Hfome.jsx
import React, { useState } from "react";
import CustomSlider from "./Slider";
import Products from "../Products";
import WhatsNew from "./Whatsnew";
import Elite from "./Elite";

const Hfome = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div style={{ padding: 20 }}>
      <CustomSlider />

      <br />

      <Products filters={{ category: selectedCategory.toLowerCase() }} />

      <br />

      <WhatsNew />

      <br />

      <Elite />
    </div>
  );
};

export default Hfome;