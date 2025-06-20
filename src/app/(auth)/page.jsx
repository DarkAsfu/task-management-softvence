import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side with gradient and illustration */}
      <div className="flex-1 bg-[#040612] flex items-center justify-center p-8 relative overflow-hidden">
        {/* Top-left gradient circle */}
        <div className="absolute top-0 left-0 h-[200px] w-[400px] -translate-x-1/4 -translate-y-1/4 rounded-full bg-primary opacity-50 blur-[110px]"></div>
        
        {/* Bottom-right gradient circle */}
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/4 rounded-full bg-primary opacity-50 blur-[80px]"></div>
        
        <div className="z-10">
          <Image
            src="/login.png"
            alt="Team collaboration illustration"
            width={500}
            height={477}
            className=""
          />
        </div>
      </div>

      {/* Right side with login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-[40px] font-semibold text-heading font-poppins leading-[52.8px]
            tracking-[-0.8px]">Login</h1>
            <p className="text-[14px] text-[#667085] font-[500] leading-[26.24px] font-poppins">Welcome Back, Please Enter your Details to Log In.</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-heading">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m32220@gmail.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#60E5AE] focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-heading">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#60E5AE] focus:border-transparent"
              />
            </div>
            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-[16px] font-[400] text-subtext">
                  Remember me
                </Label>
              </div>
              <a href="#" className="text-[16px] font-[400] text-subtext hover:text-gray-800">
                Forgot password?
              </a>
            </div>

            {/* Login button */}
            <Button className="w-full bg-primary hover:bg-primary/50 text-black font-medium  rounded-md transition-colors text-[18px] py-6">
              Log In
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            {/* Sign up link */}
            <div className="text-center">
              <span className="text-[16px] text-subtext">
                {"Don't have an account? "}
                <Link href="/signup" className="font-medium text-heading hover:text-heading/90">
                  Sign Up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}