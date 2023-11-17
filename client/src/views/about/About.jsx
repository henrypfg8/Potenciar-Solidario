import React from "react";
import styles from "./about.module.css";
import { NavLink } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";

const About = () => {
  return (
    <div className={styles.About}>
      <div className={styles.AboutContent}>
        <div className={styles.MemberInfo}>
          <Space direction="vertical" size={16} />
          <Space wrap size={16}>
            <Avatar
              size={64}
              icon={<UserOutlined />}
              src="../../../public/images/elian.png"
            />
          </Space>

          <NavLink
            to={"https://www.linkedin.com/in/elian-rivera-619297239/"}
            target="_blank"
          >
            <img
              className={styles.img}
              src="https://imgs.search.brave.com/IgX9_wXgeDo05kR8Z-Z4vNixhO82oaQq1fGfGqrmsRQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbi1pY29ucy5j/b20vaWNvbnMyLzEw/OTkvUE5HLzUxMi8x/NDg1NDgyMTk5LWxp/bmtlZGluXzc4NjY3/LnBuZw"
              alt="Linkedin"
            />
          </NavLink>

          <NavLink to={"https://github.com/elianbenjamin"} target="_blank">
            <img
              className={styles.img2}
              src="https://github.com/fluidicon.png"
              alt="Git hub"
            />
          </NavLink>

          <Space direction="vertical" size={16} />
          <Space wrap size={16}>
            <Avatar
              size={64}
              icon={<UserOutlined />}
              src="../../../public/images/cropped_pfp.png"
            />
          </Space>

          <NavLink
            to={"https://www.linkedin.com/in/enzo-samojedny-6a2655264/"}
            target="_blank"
          >
            <img
              className={styles.img}
              src="https://imgs.search.brave.com/IgX9_wXgeDo05kR8Z-Z4vNixhO82oaQq1fGfGqrmsRQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbi1pY29ucy5j/b20vaWNvbnMyLzEw/OTkvUE5HLzUxMi8x/NDg1NDgyMTk5LWxp/bmtlZGluXzc4NjY3/LnBuZw"
              alt="Linkedin"
            />
          </NavLink>

          <NavLink to={"https://github.com/enzosamojedny"} target="_blank">
            <img
              className={styles.img2}
              src="https://github.com/fluidicon.png"
              alt="Git hub"
            />
          </NavLink>

          <Space direction="vertical" size={16} />
          <Space wrap size={16}>
            <Avatar
              size={64}
              icon={<UserOutlined />}
              shape="square"
              src="../../../public/images/angeeeeeel.jpeg"
            />
          </Space>

          <NavLink
            to={"https://www.linkedin.com/in/angel-pe%C3%B1alver-926bba268/"}
            target="_blank"
          >
            <img
              className={styles.img}
              src="https://imgs.search.brave.com/IgX9_wXgeDo05kR8Z-Z4vNixhO82oaQq1fGfGqrmsRQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbi1pY29ucy5j/b20vaWNvbnMyLzEw/OTkvUE5HLzUxMi8x/NDg1NDgyMTk5LWxp/bmtlZGluXzc4NjY3/LnBuZw"
              alt="Linkedin"
            />
          </NavLink>

          <NavLink to={"https://github.com/AngelPenalver/"} target="_blank">
            <img
              className={styles.img2}
              src="https://github.com/fluidicon.png"
              alt="Git hub"
            />
          </NavLink>

          <Space direction="vertical" size={16} />
          <Space wrap size={16}>
            <Avatar
              size={64}
              icon={<UserOutlined />}
              shape="square"
              src="../../../public/images/marcos-senn.jpeg"
            />
          </Space>

          <NavLink
            to={"https://www.linkedin.com/in/marcossenn/"}
            target="_blank"
          >
            <img
              className={styles.img}
              src="https://imgs.search.brave.com/IgX9_wXgeDo05kR8Z-Z4vNixhO82oaQq1fGfGqrmsRQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbi1pY29ucy5j/b20vaWNvbnMyLzEw/OTkvUE5HLzUxMi8x/NDg1NDgyMTk5LWxp/bmtlZGluXzc4NjY3/LnBuZw"
              alt="Linkedin"
            />
          </NavLink>

          <NavLink to={"https://github.com/marcos-senn"} target="_blank">
            <img
              className={styles.img2}
              src="https://github.com/fluidicon.png"
              alt="Git hub"
            />
          </NavLink>

          <Space direction="vertical" size={16} />
          <Space wrap size={16}>
            <Avatar
              size={64}
              icon={<UserOutlined />}
              shape="square"
              src="../../../public/images/Screenshot_20231117-090958-668.png"
            />
          </Space>

          <NavLink
            to={"https://www.linkedin.com/in/mariano-aguirre-ba279a18b/"}
            target="_blank"
          >
            <img
              className={styles.img}
              src="https://imgs.search.brave.com/IgX9_wXgeDo05kR8Z-Z4vNixhO82oaQq1fGfGqrmsRQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbi1pY29ucy5j/b20vaWNvbnMyLzEw/OTkvUE5HLzUxMi8x/NDg1NDgyMTk5LWxp/bmtlZGluXzc4NjY3/LnBuZw"
              alt="Linkedin"
            />
          </NavLink>

          <NavLink to={"https://github.com/MarianoCroce"} target="_blank">
            <img
              className={styles.img2}
              src="https://github.com/fluidicon.png"
              alt="Git hub"
            />
          </NavLink>

          <Space direction="vertical" size={16} />
          <Space wrap size={16}>
            <Avatar
              size={64}
              icon={<UserOutlined />}
              shape="square"
              src="../../../public/images/marcooos.png"
            />
          </Space>

          <NavLink
            to={"https://www.linkedin.com/in/marcos-daniel-garcia-5b6623176/"}
            target="_blank"
          >
            <img
              className={styles.img}
              src="https://imgs.search.brave.com/IgX9_wXgeDo05kR8Z-Z4vNixhO82oaQq1fGfGqrmsRQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbi1pY29ucy5j/b20vaWNvbnMyLzEw/OTkvUE5HLzUxMi8x/NDg1NDgyMTk5LWxp/bmtlZGluXzc4NjY3/LnBuZw"
              alt="Linkedin"
            />
          </NavLink>

          <NavLink to={"https://github.com/Marcos-GG"} target="_blank">
            <img
              className={styles.img2}
              src="https://github.com/fluidicon.png"
              alt="Git hub"
            />
          </NavLink>

          <Space direction="vertical" size={16} />
          <Space wrap size={16}>
            <Avatar
              size={64}
              icon={<UserOutlined />}
              shape="square"
              src="../../../public/images/ramirooo.png"
            />
          </Space>

          <NavLink
            to={"https://www.linkedin.com/in/ramiro-pagella-89035725a/"}
            target="_blank"
          >
            <img
              className={styles.img}
              src="https://imgs.search.brave.com/IgX9_wXgeDo05kR8Z-Z4vNixhO82oaQq1fGfGqrmsRQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbi1pY29ucy5j/b20vaWNvbnMyLzEw/OTkvUE5HLzUxMi8x/NDg1NDgyMTk5LWxp/bmtlZGluXzc4NjY3/LnBuZw"
              alt="Linkedin"
            />
          </NavLink>

          <NavLink to={"https://github.com/RamiroPagella"} target="_blank">
            <img
              className={styles.img2}
              src="https://github.com/fluidicon.png"
              alt="Git hub"
            />
          </NavLink>

          <Space direction="vertical" size={16} />
          <Space wrap size={16}>
            <Avatar size={64} icon={<UserOutlined />} shape="square" />
          </Space>

          <NavLink
            to={"https://www.linkedin.com/in/byron-chanax-64427a21b/"}
            target="_blank"
          >
            <img
              className={styles.img}
              src="https://imgs.search.brave.com/IgX9_wXgeDo05kR8Z-Z4vNixhO82oaQq1fGfGqrmsRQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbi1pY29ucy5j/b20vaWNvbnMyLzEw/OTkvUE5HLzUxMi8x/NDg1NDgyMTk5LWxp/bmtlZGluXzc4NjY3/LnBuZw"
              alt="Linkedin"
            />
          </NavLink>

          <NavLink to={"https://github.com/byron-fran"} target="_blank">
            <img
              className={styles.img2}
              src="https://github.com/fluidicon.png"
              alt="Git hub"
            />
          </NavLink>
        </div>
        <p className={styles.Copyright}>
          copyright &copy; 2023 - App FullStack - Developed by Angel, Byron,
          Elián, Enzo, Mariano, Marcos senn, Marcos G and Ramiro. All rights
          reserved.{" "}
        </p>
      </div>
    </div>
  );
};

export default About;
