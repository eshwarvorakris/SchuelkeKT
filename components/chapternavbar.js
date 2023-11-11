import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from "next/link";
import {useEffect, useState } from 'react';
import Image from 'next/image';

function Chapternavbar ({profile}) {
    
 
    
    return (
        <nav class="course-chapter-nav">
          <div className="navbar__root">
            <div className="nav__page-title">
                <h4>Chapter</h4>
            </div>
            <div className="nav__user-actions">
                {/* <div className="nav-search">
                    <img alt="" src="data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.8'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.87457 8.59584C7.67188 9.78921 5.72193 9.78921 4.51924 8.59584C3.31654 7.40247 3.31654 5.46764 4.51924 4.27427C5.72193 3.0809 7.67188 3.0809 8.87457 4.27427C10.0773 5.46764 10.0773 7.40247 8.87457 8.59584ZM3.72736 9.38158C2.08732 7.75426 2.08732 5.11585 3.72736 3.48853C5.36739 1.86121 8.02641 1.86121 9.66645 3.48853C11.2101 5.02019 11.3008 7.44755 9.93868 9.08452L12.8521 11.9753L12.0602 12.7611L9.11742 9.84111C7.47826 10.9909 5.19487 10.8377 3.72736 9.38158Z' fill='black'/%3E%3C/g%3E%3C/svg%3E%0A" alt="" />
                <input type="text" placeholder='Search' className="user-serch" />

                </div> */}
                <div className="nav-profile">
                    <img alt="" src={profile.profile_img != null ? profile.profile_img : "/admin-images/nav/avatar.png"} style={{width:"50px",borderRadius:"50%"}} />
                    <small>{profile?.full_name}</small> 
                </div>
            </div>
          </div>
        </nav>
    );
}

export default Chapternavbar;