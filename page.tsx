import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

"use client";

interface RecoilRootWrapperProps {
	children: React.ReactNode;
}

export default function RecoilRootWrapper({children,}: RecoilRootWrapperProps) {
	return <RecoilRoot>{children}</RecoilRoot>;
}