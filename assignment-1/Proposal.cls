\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{Proposal}[12/04/2022 Autonomous Software Agents - Assignment 1]

\newif\ifvacio
\DeclareOption{vacio}{\vaciotrue}

\DeclareOption*{\PassOptionsToClass{\CurrentOption}{article}}

\ProcessOptions\relax

\LoadClass[letterpaper,11pt]{article} % Article class
\usepackage[british]{babel} % British English Babel
\usepackage[utf8]{inputenc} % utf8
\usepackage{microtype} % microtype to reduce the hypenation
\usepackage{amsmath} % math
\usepackage{graphicx} % Images
\usepackage{titlesec} % Title space
\usepackage{booktabs} % Tables

% Geometry
\usepackage[top=25mm, bottom=25mm, left=30mm, right=30mm]{geometry} 
% If we are not able to remove something we can use
%\usepackage[top=20mm, bottom=20mm, left=27mm, right=27mm]{geometry} 

\usepackage{tabularx} % Tables
\usepackage{multirow} % multiple rows
\usepackage{multicol} % multiple columns
\usepackage{tikz}
\usepackage{lipsum}
\graphicspath{{img/}, {appendix/}}

\usepackage[absolute]{textpos} % Absolute text positioning
\usepackage{hyperref}  % hyperref

% Spacing
\setlength{\TPHorizModule}{1cm}
\setlength{\TPVertModule}{1cm}
\setlength{\parindent}{0cm}
\titlespacing*{\section}{0pt}{0.5\baselineskip}{0.3\baselineskip}
\titlespacing{\subsection}{0pt}{0.5\baselineskip}{0.3\baselineskip}
\titlespacing{\subsubsection}{0pt}{0.5\baselineskip}{0.3\baselineskip}
\endinput