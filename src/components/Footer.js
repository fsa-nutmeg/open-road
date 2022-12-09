import React from "react";

export default function App() {
  return (
    <footer class="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022{" "}
        <a
          href="https://github.com/fsa-nutmeg/open-road"
          class="hover:underline"
        >
          Open-Road Github™
        </a>
        . All Rights Reserved.
      </span>
      <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a>Contributors:</a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/ashton-griffin-/"
            class="mr-4 hover:underline md:mr-6 "
          >
            Ashton Griffin
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/riley-james-mack/"
            class="mr-4 hover:underline md:mr-6"
          >
            Riley Mack
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/sethway/"
            class="mr-4 hover:underline md:mr-6"
          >
            Seth Wey
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/jeff-albaral/"
            class="hover:underline"
          >
            Jeff Albaral
          </a>
        </li>
      </ul>
    </footer>
  );
}
