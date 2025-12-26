'use client'

import { useState, useEffect } from 'react'
import { X, Instagram, Copy, Check } from 'lucide-react'

interface InstagramModalProps {
  message: string
  username: string
  onClose: () => void
}

export default function InstagramModal({ message, username, onClose }: InstagramModalProps) {
  const [copied, setCopied] = useState(false)

  // Auto-copy message when modal opens
  useEffect(() => {
    const copyMessage = async () => {
      try {
        await navigator.clipboard.writeText(message)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
    copyMessage()
  }, [message])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleOpenInstagram = () => {
    // Copy message to clipboard first
    handleCopy()
    
    // Instagram DM direct link (opens DM interface directly)
    const instagramDM = `https://ig.me/m/${username}`
    
    // Instagram profile URL (fallback)
    const instagramProfile = `https://www.instagram.com/${username}/`
    
    // Try Instagram app DM first (mobile)
    const instagramAppDM = `instagram://direct?username=${username}`
    
    // Try app DM first (mobile)
    try {
      const link = document.createElement('a')
      link.href = instagramAppDM
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error('Failed to open Instagram app:', err)
    }
    
    // Open web DM (desktop) - this opens the DM interface directly
    setTimeout(() => {
      const dmWindow = window.open(instagramDM, '_blank')
      
      // If DM link doesn't work, fallback to profile
      if (!dmWindow || dmWindow.closed) {
        setTimeout(() => {
          window.open(instagramProfile, '_blank')
        }, 500)
      }
    }, 300)
    
    // Show helpful notification
    setTimeout(() => {
      alert('💡 Tip: Once Instagram opens, click in the message box and press Cmd/Ctrl+V to paste your order!')
    }, 1000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-wine-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Instagram className="w-6 h-6 text-wine-900" />
            <h2 className="text-2xl font-bold text-wine-900">
              Send Order via Instagram
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-wine-400 hover:text-wine-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Your order message is ready and copied to clipboard! Click the button below to open the Instagram DM with <span className="font-semibold text-wine-900">@{username}</span>, then paste (Cmd/Ctrl+V) in the message box and send!
            </p>
            
            <div className="bg-wine-50 border border-wine-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Order Message:</label>
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-2 text-wine-700 hover:text-wine-900 transition text-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <textarea
                readOnly
                value={message}
                className="w-full px-4 py-3 border border-wine-200 rounded-lg bg-white text-gray-900 resize-none"
                rows={8}
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              />
            </div>

            <button
              onClick={handleOpenInstagram}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition flex items-center justify-center space-x-2"
            >
              <Instagram className="w-5 h-5" />
              <span>Open Instagram DM</span>
            </button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800 text-center">
                <strong>Quick Steps:</strong> 1) Click button above → 2) Click in message box → 3) Paste (Cmd/Ctrl+V) → 4) Click Send! ✨
              </p>
            </div>
            
            <div className="bg-wine-50 border border-wine-200 rounded-lg p-3">
              <p className="text-xs text-wine-800 text-center">
                💡 <strong>Pro Tip:</strong> The message is already copied! Just click in the Instagram message box and paste (Cmd/Ctrl+V).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

