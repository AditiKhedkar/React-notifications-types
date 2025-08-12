<button 
  onClick={() => notify('info', 'Download Ready', 'Click here to download.', {
    position: 'bottom-left',
    action: { label: 'Download', onClick: () => alert('Downloading...') }
  })}
>
  Show Info with Action (Bottom Left)
</button>
