"use client"

import NextLink from "next/link"
import { Button, Col, IconButton, Link } from "@vaneui/ui"
import type { ButtonProps, ColProps, IconButtonProps, LinkProps } from "@vaneui/ui"

// VaneUI components rendered through next/link. Server pages cannot pass `tag={NextLink}` themselves.
export const LinkButton = (props: ButtonProps & { href: string }) => <Button tag={NextLink} {...props}/>
export const LinkIconButton = (props: IconButtonProps & { href: string }) => <IconButton tag={NextLink} {...props}/>
export const LinkCol = (props: ColProps & { href: string }) => <Col tag={NextLink} {...props}/>
export const TextLink = (props: LinkProps & { href: string }) => <Link tag={NextLink} {...props}/>
