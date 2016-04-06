@echo off
Setlocal EnableDelayedExpansion

set "str=\windows\system32"
set "strPath=%SystemDrive%%str%"

reg delete HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\GWX /v DisableGWX /f
regedit /s "%~dp0\EnableW10Upgrade.reg"

for /r %strPath% %%a in (*) do (
    if /I "%%~nxa"=="gwx1.exe" (
        set p=%%~dpnxa  
        set pa=%%~dpa
    )
)

if defined p (  
    if !pa:~-1!==\ SET pa=!pa:~0,-1!
    REM echo !pa!    
    takeown /F %p% /A
    ICACLS %p% /grant "*S-1-5-32-544:(D,WDAC)"
    ren %p% GWX.exe
)

Echo Windows 10 Update is enabled.


pause