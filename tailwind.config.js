import withMT from "@material-tailwind/react/utils/withMT";

const config = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite-react/**/*.js",
    // Add other paths as needed
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require('flowbite/plugin') // Add Flowbite plugin here
  ],
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: "#f4aa3a",
          secondary: "#f4f4a1",
          accent: "#1be885",
          neutral: "#272136",
          "base-100": "#ffffff",
          info: "#778ad4",
          success: "#23b893",
          warning: "#f79926",
          error: "#ea535a",
          body: {
            "background-color": "#ffff",
          },
        },
      },
    ],
  },
});

export default config;