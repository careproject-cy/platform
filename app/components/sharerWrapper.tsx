'use client'

import React from 'react';
import { Row } from "@/components/ui/layout";
import SocialShare from "../../components/complex/sharer";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";

const Sharer: React.FC<{ labelText?: string, shareText?: string, url?: string }> = ({ labelText = "Share this page with your friends:", shareText, url }) => {
  return (
    <Row vCentered xl justifyEnd>
      <Text>{labelText}</Text>
      <SocialShare
        containerComponent={(props) => <Row vCentered {...props} />}
        /*buttonComponent={(props) => <Button md {...props} />}*/
        buttonComponents={
          {
            fb: (props) =>
              <span className="w-10 h-10 opacity-70 hover:opacity-100 hover:bg-gray-200 cursor-pointer rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                  <path d="M42,11.5v25c0,3.03-2.47,5.5-5.5,5.5H31V28h3.62c0.51,0,0.94-0.38,1-0.88l0.37-3c0.04-0.28-0.05-0.57-0.24-0.78 C35.56,23.12,35.29,23,35,23h-4v-3.5c0-1.1,0.9-2,2-2h2c0.55,0,1-0.45,1-1v-3.38c0-0.51-0.4-0.94-0.91-0.99 C35.03,12.12,33.62,12,31.83,12c-4.4,0-6.83,2.62-6.83,7.37V23h-4c-0.55,0-1,0.45-1,1v3c0,0.55,0.45,1,1,1h4v14H11.5 C8.47,42,6,39.53,6,36.5v-25C6,8.47,8.47,6,11.5,6h25C39.53,6,42,8.47,42,11.5z"></path>
                </svg>
              </span>,
            li: (props) =>
              <span className="w-10 h-10 opacity-70 hover:opacity-100 hover:bg-gray-200 cursor-pointer rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                  <path d="M36.5,6h-25C8.468,6,6,8.468,6,11.5v25c0,3.032,2.468,5.5,5.5,5.5h25c3.032,0,5.5-2.468,5.5-5.5v-25	C42,8.468,39.532,6,36.5,6z M18,34c0,0.553-0.447,1-1,1h-3c-0.553,0-1-0.447-1-1V21c0-0.553,0.447-1,1-1h3c0.553,0,1,0.447,1,1V34z M15.5,18c-1.381,0-2.5-1.119-2.5-2.5c0-1.381,1.119-2.5,2.5-2.5s2.5,1.119,2.5,2.5C18,16.881,16.881,18,15.5,18z M35,34	c0,0.553-0.447,1-1,1h-3c-0.553,0-1-0.447-1-1v-7.5c0-1.379-1.121-2.5-2.5-2.5S25,25.121,25,26.5V34c0,0.553-0.447,1-1,1h-3	c-0.553,0-1-0.447-1-1V21c0-0.553,0.447-1,1-1h3c0.553,0,1,0.447,1,1v0.541C26.063,20.586,27.462,20,29,20c3.309,0,6,2.691,6,6V34z"></path>
                </svg>
              </span>,
            x: (props) =>
              <span className="w-10 h-10 opacity-70 hover:opacity-100 hover:bg-gray-200 cursor-pointer rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                  <path d="M 12.5 6 C 8.916 6 6 8.916 6 12.5 L 6 35.5 C 6 39.084 8.916 42 12.5 42 L 35.5 42 C 39.084 42 42 39.084 42 35.5 L 42 12.5 C 42 8.916 39.084 6 35.5 6 L 12.5 6 z M 13.828125 14 L 20.265625 14 L 25.123047 20.943359 L 31.136719 14 L 33.136719 14 L 26.025391 22.234375 L 34.257812 34 L 27.820312 34 L 22.470703 26.351562 L 15.865234 34 L 13.822266 34 L 21.564453 25.056641 L 13.828125 14 z M 16.935547 15.695312 L 28.587891 32.304688 L 31.150391 32.304688 L 19.498047 15.695312 L 16.935547 15.695312 z"></path>
                </svg>
              </span>,
            wa: (props) =>
              <span className="w-10 h-10 opacity-70 hover:opacity-100 hover:bg-gray-200 cursor-pointer rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                  <path d="M24,4C12.97,4,4,12.97,4,24c0,3.19,0.77,6.34,2.23,9.17l-2.14,7.66c-0.24,0.87,0.01,1.8,0.64,2.44 C5.21,43.74,5.85,44,6.5,44c0.23,0,0.45-0.03,0.67-0.09l7.66-2.14C17.66,43.23,20.82,44,24,44c11.03,0,20-8.97,20-20 C44,12.97,35.03,4,24,4z M34.36,31.37c-0.44,1.23-2.6,2.42-3.57,2.51c-0.97,0.09-1.88,0.44-6.34-1.32 c-5.38-2.12-8.78-7.63-9.04-7.99c-0.27-0.35-2.16-2.86-2.16-5.47c0-2.6,1.37-3.88,1.85-4.41c0.49-0.53,1.06-0.66,1.41-0.66 c0.36,0,0.71,0,1.02,0.01c0.37,0.02,0.79,0.04,1.19,0.92c0.47,1.04,1.5,3.66,1.63,3.93c0.13,0.26,0.22,0.57,0.04,0.92 c-0.17,0.35-0.26,0.57-0.53,0.88c-0.26,0.31-0.55,0.69-0.79,0.93c-0.26,0.26-0.54,0.55-0.23,1.08c0.31,0.53,1.37,2.26,2.94,3.66 c2.02,1.8,3.72,2.36,4.25,2.63c0.53,0.26,0.84,0.22,1.15-0.14c0.31-0.35,1.32-1.54,1.68-2.07c0.35-0.53,0.7-0.44,1.19-0.26 c0.48,0.17,3.08,1.45,3.61,1.72c0.53,0.26,0.88,0.39,1.01,0.61C34.8,29.07,34.8,30.13,34.36,31.37z"></path>
                </svg>
              </span>,
            tg: () =>
              <span className="w-10 h-10 opacity-70 hover:opacity-100 hover:bg-gray-200 cursor-pointer rounded-md flex items-center justify-center">
                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                  <path d="M5.83,23.616c12.568-5.529,28.832-12.27,31.077-13.203c5.889-2.442,7.696-1.974,6.795,3.434 c-0.647,3.887-2.514,16.756-4.002,24.766c-0.883,4.75-2.864,5.313-5.979,3.258c-1.498-0.989-9.059-5.989-10.7-7.163 c-1.498-1.07-3.564-2.357-0.973-4.892c0.922-0.903,6.966-6.674,11.675-11.166c0.617-0.59-0.158-1.559-0.87-1.086 c-6.347,4.209-15.147,10.051-16.267,10.812c-1.692,1.149-3.317,1.676-6.234,0.838c-2.204-0.633-4.357-1.388-5.195-1.676 C1.93,26.43,2.696,24.995,5.83,23.616z"></path>
                </svg>
              </span>,
            em: (props) =>
              <span className="w-10 h-10 opacity-70 hover:opacity-100 hover:bg-gray-200 cursor-pointer rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                  <path d="M 10.5 8 C 6.9280619 8 4 10.928062 4 14.5 L 4 33.5 C 4 37.071938 6.9280619 40 10.5 40 L 37.5 40 C 41.071938 40 44 37.071938 44 33.5 L 44 14.5 C 44 10.928062 41.071938 8 37.5 8 L 10.5 8 z M 10.5 11 L 37.5 11 C 38.093018 11 38.640276 11.157774 39.126953 11.412109 L 24 19.589844 L 8.8730469 11.412109 C 9.3597237 11.157774 9.9069817 11 10.5 11 z M 10 18.84375 L 22.572266 25.638672 C 23.018266 25.879672 23.509 26 24 26 C 24.491 26 24.981734 25.879672 25.427734 25.638672 L 38 18.84375 L 38 36.951172 C 37.835551 36.974343 37.671413 37 37.5 37 L 10.5 37 C 10.328587 37 10.164449 36.974343 10 36.951172 L 10 18.84375 z"></path>
                </svg>
              </span>,
          }
        }
        url={url ?? window.location.href}
        text={shareText ?? "Check out this amazing website!"}
        platforms={["fb", "li", "x", "wa", "tg", "em"]}
      />
    </Row>
  );
};

export default Sharer;
