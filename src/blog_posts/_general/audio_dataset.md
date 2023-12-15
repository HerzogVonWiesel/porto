## Dataset advice

Isolate your voice as much as possible, in the highest quality possible. This may seem like obvious advice, but it needs to be underlined: As for all machine learning: __BS in, BS out.__
\
\
I recommend using [Ultimate Vocal Remover→](https://github.com/Anjok07/ultimatevocalremovergui/releases) to isolate your desired voice using some nifty AI models. Of the models available, the best ones seem to be "Kim Vocal 2" and "MDX-NET_Main_438"; The latter is a VIP model, though you can get the VIP code from [UVR's Patreon→](https://www.patreon.com/uvr).
\
\
For the best results, it's essential to eliminate reverb and echo from your dataset. Ideally, you should minimize these effects during the recording process. However, in case there just *is* reverb, there's a solution available under MDX-Net called Reverb HQ, which allows you to export reverbless audio by selecting the 'No Other' option. 
In some cases, Reverb HQ might not completely remove the echo. One option is to process the vocal output through a VR Architecture model: I'd recommend De-Echo-DeReverb. 
If, for some reason, that's still not enough, there's still the De-Echo normal model, which is the most aggressive echo removal tool available and can be used as a last resort.
\
\
To remove noise in the audio, I'd recommend using Audacity's Noise gate or its other noise removal tools.